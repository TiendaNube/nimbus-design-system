/**
 * Deterministic prop / native-HTML-attribute collision checker.
 *
 * The bug it catches: a component declares its own prop (say `color?: TextSprinkle`) and
 * its props type intersects a React native-attributes type that already declares a key of
 * the same name (`color?: string` on `HTMLAttributes`). The bare intersection produces
 * `TextSprinkle & string` — a type no value can satisfy — so the prop the component
 * documents is unusable. Nothing in the repo notices: `tsc --noEmit` only fails where a
 * broken type is *instantiated*, and no in-repo call site does that. The bug ships and
 * surfaces in a consumer's typecheck instead.
 *
 * Three decisions make this reliable, and none of them can be done by reading a diff:
 *
 * 1. The set of native-attributes type names is read out of `@types/react` itself, never
 *    hand-written. A suffix regex alone false-positives on repo-local names such as
 *    `OmittedHTMLAttributes` (`timePicker.types.ts`); intersecting the suffix match with
 *    what `@types/react/index.d.ts` actually declares excludes it.
 * 2. Key sets come from the TypeScript checker (`getPropertiesOfType`), so inherited keys
 *    count — `HTMLAttributes` carries 278 of them, `InputHTMLAttributes` 308,
 *    `SVGAttributes` 486. A syntactic view of the interface sees almost none of that.
 * 3. Harm is decided by assignability, never by name: a collision is reported only when a
 *    value of the component's own declared type is no longer assignable to the resulting
 *    intersection. Most collisions are identical types (`children: ReactNode` accounts for
 *    the bulk of them) and are silent by design. `FileUploader` is the proof case: `onError`
 *    is broken while `onDrop`, same file and same pattern, is fine.
 *
 * Findings listed in `native-attr-collisions.baseline.ts` are printed but do not fail the run.
 * Anything new does, and so does a baseline entry that no longer collides — a baseline that
 * still names fixed bugs has stopped being a ratchet.
 *
 * Run with `yarn types:collisions`. It reads the repo's own `tsconfig.json`, so the same
 * `paths` and `lib` apply as for `types:check`. Unresolved imports (a tree without
 * `yarn build:tokens && yarn build:icons`) can only hide a finding, never invent one; CI
 * builds both before it gets here.
 */

import fs from "fs";
import path from "path";
import ts from "typescript";

import type { BaselineEntry } from "./native-attr-collisions.baseline";
import { knownCollisions } from "./native-attr-collisions.baseline";

const REPO_ROOT = path.resolve(__dirname, "..");
const COMPONENT_SOURCE_ROOT = path.join(REPO_ROOT, "packages/react/src");
// `@types/react` ships per-TS-version copies (`ts5.0/index.d.ts`), and which one is in
// effect depends on the resolved `typescript`. Match whichever the program actually loaded.
const REACT_TYPES_ENTRY =
  /[\\/]@types[\\/]react[\\/](?:[^\\/]+[\\/])?index\.d\.ts$/;
const IGNORED_DIRECTORIES = ["node_modules", "dist", "tmp"];
const SOURCE_EXTENSIONS = [".ts", ".tsx"];

/**
 * Name suffixes of the React types that carry native HTML/SVG/ARIA attributes. Matching a
 * suffix is not enough on its own — the result is always intersected with the names
 * `@types/react` really declares (see `readNativeAttributeTypeNames`).
 */
const NATIVE_TYPE_NAME_PATTERN =
  /(?:HTMLAttributes|HTMLProps|SVGAttributes|SVGProps|AriaAttributes|DOMAttributes|ComponentProps(?:With(?:out)?Ref)?)$/;

/**
 * Type-level wrappers that keep the wrapped side's nature: `Omit<HTMLAttributes<T>, "x">`
 * is still the native side, `Omit<OwnProperties, "x">` is still the component's own side.
 */
const TRANSPARENT_WRAPPERS = [
  "Omit",
  "Pick",
  "Partial",
  "Required",
  "Readonly",
];

const EXIT_FAILURE = 1;

/**
 * `isTypeAssignableTo` is the assignability relation the compiler uses for every
 * `error TS2322`. It is the one thing that separates a harmless collision from a broken prop,
 * and no public checker API exposes it — TypeScript marks it `@internal`, so it is absent from
 * the published `TypeChecker` typing while being present on the object at runtime (it has been
 * since TypeScript 2.x). Declaring it here keeps the cast in one documented place.
 */
interface AssignabilityChecker extends ts.TypeChecker {
  isTypeAssignableTo(source: ts.Type, target: ts.Type): boolean;
}

export interface Collision {
  /** Repo-relative path of the file declaring the props type. */
  file: string;
  /** 1-based line of the declaration. */
  line: number;
  /** Name of the props type or interface. */
  declaration: string;
  /** The colliding prop name. */
  key: string;
  /** The type the component declares for the prop. */
  ownType: string;
  /** The type the native attributes side declares for the same prop. */
  nativeType: string;
  /** The type consumers actually get — the intersection of the two. */
  effectiveType: string;
  /**
   * The constituents of the declared type that no longer survive the intersection. For a
   * union prop this pinpoints the part that broke (`TextConditions<…>` out of a 26-member
   * union); for a plain prop it is the declared type itself.
   */
  unusableTypes: string[];
  /** The native attributes side, as written in the source. */
  nativeSide: string;
}

/** Every `.ts`/`.tsx` file under `directory`, skipping build output and nested installs. */
export function collectSourceFiles(directory: string): string[] {
  const files: string[] = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (IGNORED_DIRECTORIES.includes(entry.name)) continue;
      files.push(...collectSourceFiles(entryPath));
    } else if (SOURCE_EXTENSIONS.includes(path.extname(entry.name))) {
      files.push(entryPath);
    }
  }

  return files.sort();
}

/** A `ts.Program` over `fileNames` using the repo's own compiler options. */
export function createProgram(fileNames: readonly string[]): ts.Program {
  const configPath = path.join(REPO_ROOT, "tsconfig.json");
  const { config } = ts.readConfigFile(configPath, ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(
    { ...config, include: undefined, files: [] },
    ts.sys,
    REPO_ROOT
  );

  return ts.createProgram([...fileNames], {
    ...parsed.options,
    noEmit: true,
    noUnusedLocals: false,
  });
}

/**
 * The native-attributes type names declared by the `@types/react` that this program
 * resolves — the authoritative list, so repo-local look-alikes are never matched.
 */
export function readNativeAttributeTypeNames(
  program: ts.Program
): ReadonlySet<string> {
  const reactTypes = program
    .getSourceFiles()
    .find((sourceFile) => REACT_TYPES_ENTRY.test(sourceFile.fileName));

  if (!reactTypes) {
    throw new Error(
      "Could not locate @types/react/index.d.ts in the program. Run `yarn install` first."
    );
  }

  const names = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (
      (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) &&
      NATIVE_TYPE_NAME_PATTERN.test(node.name.text)
    ) {
      names.add(node.name.text);
    }
    node.forEachChild(visit);
  };
  reactTypes.forEachChild(visit);

  if (names.size === 0) {
    throw new Error(
      `No native attribute types found in ${reactTypes.fileName}. Has @types/react changed shape?`
    );
  }

  return names;
}

/** The members of an intersection, flattened; a non-intersection node is its own member. */
function intersectionMembers(typeNode: ts.TypeNode): ts.TypeNode[] {
  if (!ts.isIntersectionTypeNode(typeNode)) return [typeNode];
  return typeNode.types.flatMap(intersectionMembers);
}

/** The referenced type name of a node, without its namespace qualifier. */
function referencedTypeName(node: ts.Node): string | null {
  if (ts.isTypeReferenceNode(node)) {
    return node.typeName.getText().split(".").pop() ?? null;
  }
  if (ts.isExpressionWithTypeArguments(node)) {
    return node.expression.getText().split(".").pop() ?? null;
  }
  return null;
}

/** Whether a node resolves to a React native-attributes type, through any wrapper. */
function isNativeSide(
  node: ts.Node,
  nativeTypeNames: ReadonlySet<string>
): boolean {
  const name = referencedTypeName(node);
  if (!name) return false;
  if (nativeTypeNames.has(name)) return true;

  if (TRANSPARENT_WRAPPERS.includes(name)) {
    const [wrapped] = (node as ts.NodeWithTypeArguments).typeArguments ?? [];
    return wrapped ? isNativeSide(wrapped, nativeTypeNames) : false;
  }

  return false;
}

type PropsDeclaration = ts.TypeAliasDeclaration | ts.InterfaceDeclaration;

/** The declaration's sides, as written: `type A = Own & HTMLAttributes<T>` or `interface A extends ...`. */
function declarationSides(declaration: PropsDeclaration): ts.Node[] {
  if (ts.isTypeAliasDeclaration(declaration)) {
    return intersectionMembers(declaration.type);
  }
  return (declaration.heritageClauses ?? []).flatMap((clause) => [
    ...clause.types,
  ]);
}

/** Property symbols of a type node, keyed by name, inherited keys included. */
function propertiesOf(
  checker: ts.TypeChecker,
  nodes: readonly ts.Node[]
): Map<string, ts.Symbol> {
  const properties = new Map<string, ts.Symbol>();

  for (const node of nodes) {
    const type = ts.isTypeNode(node)
      ? checker.getTypeFromTypeNode(node)
      : checker.getTypeAtLocation(node);

    for (const symbol of checker.getPropertiesOfType(type)) {
      if (!properties.has(symbol.getName())) {
        properties.set(symbol.getName(), symbol);
      }
    }
  }

  return properties;
}

/** Every props declaration in a source file that references a native-attributes type. */
function propsDeclarations(
  sourceFile: ts.SourceFile,
  nativeTypeNames: ReadonlySet<string>
): PropsDeclaration[] {
  const declarations: PropsDeclaration[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
      if (
        declarationSides(node).some((side) =>
          isNativeSide(side, nativeTypeNames)
        )
      ) {
        declarations.push(node);
      }
    }
    node.forEachChild(visit);
  };
  sourceFile.forEachChild(visit);

  return declarations;
}

/** The parts of `declared` that a consumer can no longer pass once `effective` applies. */
function unusableConstituents(
  checker: AssignabilityChecker,
  declared: ts.Type,
  effective: ts.Type
): string[] {
  const constituents = declared.isUnion() ? declared.types : [declared];
  const unusable = constituents
    .filter(
      (constituent) =>
        (constituent.flags & ts.TypeFlags.Undefined) === 0 &&
        !checker.isTypeAssignableTo(constituent, effective)
    )
    .map((constituent) => checker.typeToString(constituent));

  // The caller only asks once the whole type is known to be unassignable, so there is always
  // something to name; fall back to the type as a whole rather than reporting nothing.
  return unusable.length > 0 ? unusable : [checker.typeToString(declared)];
}

/** The harmful collisions of one declaration, decided by assignability. */
function collisionsOf(
  checker: AssignabilityChecker,
  sourceFile: ts.SourceFile,
  declaration: PropsDeclaration,
  nativeTypeNames: ReadonlySet<string>
): Collision[] {
  const sides = declarationSides(declaration);
  const nativeSides = sides.filter((side) =>
    isNativeSide(side, nativeTypeNames)
  );
  const ownSides = sides.filter((side) => !isNativeSide(side, nativeTypeNames));

  // A re-derivation such as `ComponentPropsWithRef<typeof Input>` has no own side of its
  // own to collide with, so there is nothing to compare.
  if (nativeSides.length === 0 || ownSides.length === 0) return [];

  const nativeProperties = propertiesOf(checker, nativeSides);
  const ownProperties = propertiesOf(checker, ownSides);
  const effectiveProperties = propertiesOf(checker, [declaration.name]);
  const line =
    sourceFile.getLineAndCharacterOfPosition(declaration.getStart()).line + 1;
  const nativeSide = nativeSides
    .map((side) => side.getText().replace(/\s+/g, " "))
    .join(" & ");

  const collisions: Collision[] = [];

  for (const [key, ownSymbol] of ownProperties) {
    const nativeSymbol = nativeProperties.get(key);
    const effectiveSymbol = effectiveProperties.get(key);
    if (!nativeSymbol || !effectiveSymbol) continue;

    const ownType = checker.getTypeOfSymbolAtLocation(ownSymbol, declaration);
    const effectiveType = checker.getTypeOfSymbolAtLocation(
      effectiveSymbol,
      declaration
    );

    // The harm test: can a value of the type the component declares still be passed?
    if (checker.isTypeAssignableTo(ownType, effectiveType)) continue;

    collisions.push({
      file: path.relative(REPO_ROOT, sourceFile.fileName),
      line,
      declaration: declaration.name.text,
      key,
      ownType: checker.typeToString(ownType),
      nativeType: checker.typeToString(
        checker.getTypeOfSymbolAtLocation(nativeSymbol, declaration)
      ),
      effectiveType: checker.typeToString(effectiveType),
      unusableTypes: unusableConstituents(checker, ownType, effectiveType),
      nativeSide,
    });
  }

  return collisions;
}

/** Every harmful collision in `fileNames`. */
export function findCollisions(
  program: ts.Program,
  fileNames: readonly string[],
  nativeTypeNames: ReadonlySet<string>
): Collision[] {
  const checker = program.getTypeChecker() as AssignabilityChecker;
  const collisions: Collision[] = [];

  for (const fileName of fileNames) {
    const sourceFile = program.getSourceFile(fileName);
    if (!sourceFile) continue;

    for (const declaration of propsDeclarations(sourceFile, nativeTypeNames)) {
      collisions.push(
        ...collisionsOf(checker, sourceFile, declaration, nativeTypeNames)
      );
    }
  }

  return collisions;
}

/** Convenience wrapper used by the CLI and by the spec: build a program, then check it. */
export function analyzeFiles(fileNames: readonly string[]): Collision[] {
  const program = createProgram(fileNames);
  return findCollisions(
    program,
    fileNames,
    readNativeAttributeTypeNames(program)
  );
}

function matchesBaseline(collision: Collision, entry: BaselineEntry): boolean {
  return (
    collision.file === entry.file &&
    collision.declaration === entry.declaration &&
    collision.key === entry.key
  );
}

function reportCollision(collision: Collision): void {
  console.log(
    `${collision.file}:${collision.line}  ${collision.declaration}.${collision.key}`
  );
  console.log(`    native side:   ${collision.nativeSide}`);
  console.log(`    declared:      ${collision.key}: ${collision.ownType}`);
  console.log(`    native:        ${collision.key}: ${collision.nativeType}`);
  console.log(
    `    consumers get: ${collision.key}: ${collision.effectiveType}`
  );
  collision.unusableTypes.forEach((unusable) => {
    console.log(
      `    error:         Type '${unusable}' is not assignable to type '${collision.effectiveType}'.`
    );
  });
  console.log("");
}

function main(): void {
  const fileNames = collectSourceFiles(COMPONENT_SOURCE_ROOT);
  console.log(
    `Checking ${fileNames.length} files under ${path.relative(
      REPO_ROOT,
      COMPONENT_SOURCE_ROOT
    )} for prop/native-attribute collisions...\n`
  );

  const collisions = analyzeFiles(fileNames);
  const isBaselined = (collision: Collision) =>
    knownCollisions.some((entry) => matchesBaseline(collision, entry));
  const newCollisions = collisions.filter(
    (collision) => !isBaselined(collision)
  );
  const baselinedCollisions = collisions.filter(isBaselined);
  const fixedEntries = knownCollisions.filter(
    (entry) =>
      !collisions.some((collision) => matchesBaseline(collision, entry))
  );

  if (baselinedCollisions.length > 0) {
    console.log(
      "Known collisions, baselined in .scripts/native-attr-collisions.baseline.ts —\n" +
        "real bugs awaiting a fix of their own, not failures of this run:\n"
    );
    baselinedCollisions.forEach((collision) => {
      console.log(
        `  ${collision.file}:${collision.line}  ${collision.declaration}.${collision.key}`
      );
    });
    console.log("");
  }

  if (newCollisions.length > 0) {
    console.log(
      `Found ${newCollisions.length} new prop/native-attribute collision(s):\n`
    );
    newCollisions.forEach(reportCollision);
    console.log(
      "Each one means the prop as declared cannot be passed by a consumer. Omit the key from\n" +
        "the native side — `ComponentProperties & Omit<HTMLAttributes<T>, keyof ComponentProperties>`\n" +
        "— or rename the prop. Do not add it to .scripts/native-attr-collisions.baseline.ts.\n"
    );
  }

  if (fixedEntries.length > 0) {
    console.log(
      `${fixedEntries.length} baseline entr(ies) no longer collide — remove them from\n` +
        ".scripts/native-attr-collisions.baseline.ts:\n"
    );
    fixedEntries.forEach((entry) => {
      console.log(`  ${entry.file}  ${entry.declaration}.${entry.key}`);
    });
    console.log("");
  }

  console.log(
    `${collisions.length} collision(s) total: ${baselinedCollisions.length} baselined, ` +
      `${newCollisions.length} new.`
  );

  if (newCollisions.length > 0 || fixedEntries.length > 0) {
    process.exit(EXIT_FAILURE);
  }

  console.log("No new prop/native-attribute collisions.");
}

if (require.main === module) {
  main();
}
