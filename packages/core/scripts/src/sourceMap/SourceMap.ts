import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { compareStrings } from "./compareStrings";

import type {
  ComponentEntry,
  SharedEntry,
  SourceMapConfig,
  SourceMapDocument,
  YarnWorkspace,
} from "./SourceMap.types";

/**
 * Strips the known convention suffixes off a filename, in the order a file
 * can actually carry them, so what is left is the bare stem to compare
 * against the component's own name.
 */
function stem(file: string): string {
  return file
    .replace(/\.spec\.tsx?$/, "")
    .replace(/\.stories\.tsx?$/, "")
    .replace(/\.types\.ts$/, "")
    .replace(/\.docs\.json$/, "")
    .replace(/\.tsx?$/, "");
}

/**
 * `fileUploader`, `FileUploader`, `file-uploader` and `file_uploader`
 * all identify the same logical component.
 */
function normalize(value: string): string {
  return value.toLowerCase().replace(/[-_]/g, "");
}

function toPosix(value: string): string {
  return value.split(path.sep).join("/");
}

/**
 * A file belongs to the component's conventional set when its stem is the
 * component's own name - never by concatenating the name with a fixed
 * suffix, because casing is mixed within a single repo (`Box.tsx` next to
 * `box.types.ts`; `Sortable.types.ts` next to `appShell.types.ts`).
 *
 * Anything whose stem does not match is generic, unclassified overflow and
 * belongs in `extras`.
 */
function isConventional(
  file: string,
  normalizedName: string
): boolean {
  return normalize(stem(file)) === normalizedName;
}

/** Boilerplate every component carries; never worth reporting as an extra. */
const IGNORED_TOP_LEVEL = new Set([
  "package.json",
  "tsconfig.json",
  "webpack.config.ts",
  "README.md",
  "CHANGELOG.md",
  "dist",
  ".turbo",
  "node_modules",
]);

/**
 * Source directories that do not represent the implementation itself.
 */
const IGNORED_RUNTIME_DIRS = new Set([
  "demo",
  "__tests__",
]);

function isYarnWorkspace(
  value: unknown
): value is YarnWorkspace {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { name?: unknown }).name === "string" &&
    typeof (value as { location?: unknown }).location === "string"
  );
}

/**
 * Drops relative/empty PATH entries before resolving `yarn`.
 */
function sanitizedPath(): string {
  return (process.env.PATH ?? "")
    .split(path.delimiter)
    .filter((entry) => path.isAbsolute(entry))
    .join(path.delimiter);
}

function getYarnWorkspaces(
  cwd: string
): YarnWorkspace[] {
  const execOptions = {
    encoding: "utf8" as const,
    cwd,
    env: {
      ...process.env,
      PATH: sanitizedPath(),
    },
  };

  const output = execSync(
    "yarn workspaces list --json",
    execOptions
  ); // NOSONAR

  return output
    .split("\n")
    .filter((line) => line.trim())
    .map((line): unknown => JSON.parse(line))
    .filter(isYarnWorkspace);
}

/**
 * Splits a component's `src/` files into the ones the conventions already
 * account for and everything else.
 */
function classifySrcFiles(
  srcDir: string,
  files: string[],
  normalizedName: string
) {
  const unclaimed: string[] = [];
  const implementations: string[] = [];

  for (const file of files) {
    if (
      file === "index.ts" ||
      file === "index.tsx"
    ) {
      continue;
    }

    if (isConventional(file, normalizedName)) {
      if (
        /\.tsx$/.test(file) &&
        !/\.(spec|stories)\.tsx$/.test(file)
      ) {
        implementations.push(file);
      }

      continue;
    }

    unclaimed.push(file);
  }

  if (implementations.length > 1) {
    throw new Error(
      `Ambiguous implementation in ${srcDir}: ${implementations.join(
        ", "
      )} all match the component's own name. The generator refuses to guess.`
    );
  }

  return {
    unclaimed,
  };
}

/** Direct children only. */
function listFiles(
  dir: string
): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, {
      withFileTypes: true,
    })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort(compareStrings);
}

function listDirs(
  dir: string
): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, {
      withFileTypes: true,
    })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(compareStrings);
}

function listRuntimeSourceFiles(
  dir: string
): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const result: string[] = [];

  for (
    const entry of fs.readdirSync(dir, {
      withFileTypes: true,
    })
  ) {
    const fullPath = path.join(
      dir,
      entry.name
    );

    if (entry.isDirectory()) {
      if (
        !IGNORED_RUNTIME_DIRS.has(
          entry.name
        )
      ) {
        result.push(
          ...listRuntimeSourceFiles(
            fullPath
          )
        );
      }

      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (!/\.tsx?$/.test(entry.name)) {
      continue;
    }

    if (
      /\.(spec|stories)\.tsx?$/.test(
        entry.name
      )
    ) {
      continue;
    }

    result.push(fullPath);
  }

  return result.sort(compareStrings);
}

/**
 * Mirrors the component name generated by SVGR for Nimbus icon asset names.
 *
 * `arrow-left.svg` -> `ArrowLeft`
 * `user-circle.svg` -> `UserCircle`
 * `Infinite.svg` -> `Infinite`
 */
function iconComponentName(
  filename: string
): string {
  const basename = path.basename(
    filename,
    path.extname(filename)
  );

  return basename
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map(
      (part) =>
        `${part
          .charAt(0)
          .toUpperCase()}${part.slice(1)}`
    )
    .join("");
}

/**
 * Exposes concrete icon exports in the source map so consumers do not need
 * to inspect every asset just to verify that an icon exists.
 */
function collectIconExports(
  assetsDir: string
): string[] {
  if (!fs.existsSync(assetsDir)) {
    return [];
  }

  return fs
    .readdirSync(assetsDir, {
      withFileTypes: true,
    })
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith(".svg")
    )
    .map(
      (entry) =>
        `${iconComponentName(
          entry.name
        )}Icon`
    )
    .sort(compareStrings);
}

function collectExtras(
  componentRoot: string,
  unclaimedSrcFiles: string[],
  unclaimedSrcDirs: string[]
): string[] {
  const topLevelExtras =
    fs.existsSync(componentRoot)
      ? fs
          .readdirSync(
            componentRoot,
            {
              withFileTypes: true,
            }
          )
          .map(
            (entry) => entry.name
          )
          .filter(
            (name) =>
              name !== "src" &&
              !IGNORED_TOP_LEVEL.has(
                name
              )
          )
      : [];

  const srcFileExtras =
    unclaimedSrcFiles.map(
      (name) =>
        path.posix.join(
          "src",
          name
        )
    );

  const srcDirExtras =
    unclaimedSrcDirs.map(
      (name) =>
        `${path.posix.join(
          "src",
          name
        )}/`
    );

  return [
    ...topLevelExtras,
    ...srcFileExtras,
    ...srcDirExtras,
  ].sort(compareStrings);
}

function resolveStylePath(
  cwd: string,
  stylesRoot: string | undefined,
  group: string,
  componentName: string
): string | undefined {
  if (!stylesRoot) {
    return undefined;
  }

  const groupDir = path.join(
    cwd,
    stylesRoot,
    group
  );

  if (!fs.existsSync(groupDir)) {
    return undefined;
  }

  const normalizedName =
    normalize(componentName);

  const matches = listDirs(
    groupDir
  ).filter(
    (directory) =>
      normalize(directory) ===
      normalizedName
  );

  if (matches.length > 1) {
    throw new Error(
      `Ambiguous style directory for ${componentName} in ${groupDir}: ${matches.join(
        ", "
      )}`
    );
  }

  if (!matches.length) {
    return undefined;
  }

  return toPosix(
    path.relative(
      cwd,
      path.join(
        groupDir,
        matches[0]
      )
    )
  );
}

function resolveRelativeModule(
  fromFile: string,
  request: string
): string | null {
  if (!request.startsWith(".")) {
    return null;
  }

  const base = path.resolve(
    path.dirname(fromFile),
    request
  );

  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
  ];

  for (const candidate of candidates) {
    if (
      fs.existsSync(candidate) &&
      fs.statSync(candidate).isFile()
    ) {
      return candidate;
    }
  }

  return null;
}

function parseExportSpecifier(
  specifier: string
): string | null {
  const cleaned = specifier
    .trim()
    .replace(/^type\s+/, "");

  if (!cleaned) {
    return null;
  }

  const parts = cleaned.split(
    /\s+as\s+/
  );

  const exported =
    parts.length > 1
      ? parts[parts.length - 1]
      : parts[0];

  return exported.trim() || null;
}

/**
 * Recursively resolves exports from one TypeScript entrypoint.
 */
function collectExportsFromFile(
  file: string,
  visited: Set<string>
): Set<string> {
  const exports = new Set<string>();

  if (visited.has(file)) {
    return exports;
  }

  if (!fs.existsSync(file)) {
    return exports;
  }

  visited.add(file);

  const content = fs.readFileSync(
    file,
    "utf8"
  );

  if (
    /\bexport\s+default\b/.test(
      content
    )
  ) {
    exports.add("default");
  }

  const declarationRegex =
    /\bexport\s+(?:declare\s+)?(?:const|let|var|function|class|interface|type|enum)\s+([A-Za-z_$][\w$]*)/g;

  for (
    let match =
      declarationRegex.exec(content);
    match;
    match =
      declarationRegex.exec(content)
  ) {
    exports.add(match[1]);
  }

  const namedExportRegex =
    /\bexport\s+(?:type\s+)?\{([\s\S]*?)\}(?:\s+from\s+["'][^"']+["'])?\s*;/g;

  for (
    let match =
      namedExportRegex.exec(content);
    match;
    match =
      namedExportRegex.exec(content)
  ) {
    const specifiers =
      match[1].split(",");

    for (const specifier of specifiers) {
      const exported =
        parseExportSpecifier(
          specifier
        );

      if (exported) {
        exports.add(exported);
      }
    }
  }

  const namespaceExportRegex =
    /\bexport\s+\*\s+as\s+([A-Za-z_$][\w$]*)\s+from\s+["'][^"']+["']/g;

  for (
    let match =
      namespaceExportRegex.exec(content);
    match;
    match =
      namespaceExportRegex.exec(content)
  ) {
    exports.add(match[1]);
  }

  const starExportRegex =
    /\bexport\s+\*\s+from\s+["']([^"']+)["']/g;

  for (
    let match =
      starExportRegex.exec(content);
    match;
    match =
      starExportRegex.exec(content)
  ) {
    const target =
      resolveRelativeModule(
        file,
        match[1]
      );

    if (!target) {
      continue;
    }

    for (
      const exported of
      collectExportsFromFile(
        target,
        visited
      )
    ) {
      // `export * from` never re-exports the target module's default export.
      if (exported !== "default") {
        exports.add(exported);
      }
    }
  }

  return exports;
}

/**
 * Nimbus component packages expose their main `src/index.ts`. The build also
 * exposes `src/components/index.ts` when subcomponents exist, so both are
 * treated as public entrypoints.
 */
function collectPublicExports(
  componentRoot: string
): string[] {
  const entrypoints = [
    path.join(
      componentRoot,
      "src",
      "index.ts"
    ),
    path.join(
      componentRoot,
      "src",
      "components",
      "index.ts"
    ),
  ];

  const exports =
    new Set<string>();

  const visited =
    new Set<string>();

  for (const entrypoint of entrypoints) {
    if (!fs.existsSync(entrypoint)) {
      continue;
    }

    for (
      const exported of
      collectExportsFromFile(
        entrypoint,
        visited
      )
    ) {
      exports.add(exported);
    }
  }

  return [...exports].sort(
    compareStrings
  );
}

/**
 * Finds Nimbus packages referenced by the component source.
 *
 * Specs, stories and demo directories are intentionally ignored so this
 * field describes implementation dependencies rather than test/example
 * dependencies.
 */
function collectNimbusDependencies(
  srcDir: string,
  ownPackage: string
): string[] {
  const dependencies =
    new Set<string>();

  const importRegex =
    /(?:from\s+|import\s*\(\s*|import\s+|require\s*\(\s*)["'](@nimbus-ds\/[^"']+)["']/g;

  for (
    const file of
    listRuntimeSourceFiles(srcDir)
  ) {
    const content =
      fs.readFileSync(
        file,
        "utf8"
      );

    importRegex.lastIndex = 0;

    for (
      let match =
        importRegex.exec(content);
      match;
      match =
        importRegex.exec(content)
    ) {
      const dependency =
        match[1];

      if (
        dependency !== ownPackage
      ) {
        dependencies.add(
          dependency
        );
      }
    }
  }

  return [...dependencies].sort(
    compareStrings
  );
}

function buildComponentEntry(
  group: string,
  groupDir: string,
  name: string,
  workspaceByLocation: Map<
    string,
    string
  >,
  cwd: string,
  stylesRoot: string | undefined,
  storyIndex: Map<
    string,
    string
  > | null
): ComponentEntry {
  const componentRoot =
    path.join(
      groupDir,
      name
    );

  const srcDir = path.join(
    componentRoot,
    "src"
  );

  const relComponentRoot =
    toPosix(
      path.relative(
        cwd,
        componentRoot
      )
    );

  const normalizedName =
    normalize(name);

  const allSrcDirs =
    listDirs(srcDir);

  const knownSrcDirs =
    new Set([
      "components",
      "contexts",
    ]);

  const unclaimedSrcDirs =
    allSrcDirs.filter(
      (directory) =>
        !knownSrcDirs.has(
          directory
        )
    );

  const srcFiles =
    listFiles(srcDir);

  const { unclaimed } =
    classifySrcFiles(
      srcDir,
      srcFiles,
      normalizedName
    );

  const packageName =
    workspaceByLocation.get(
      relComponentRoot
    );

  if (!packageName) {
    throw new Error(
      `No yarn workspace found at ${relComponentRoot} - is ${name} missing its own package.json?`
    );
  }

  const nested = listDirs(
    path.join(
      srcDir,
      "components"
    )
  );

  const contexts = listDirs(
    path.join(
      srcDir,
      "contexts"
    )
  );

  const extras = collectExtras(
    componentRoot,
    unclaimed,
    unclaimedSrcDirs
  );

  const styles =
    resolveStylePath(
      cwd,
      stylesRoot,
      group,
      name
    );

  const publicExports =
    collectPublicExports(
      componentRoot
    );

  const dependencies =
    collectNimbusDependencies(
      srcDir,
      packageName
    );

  const entry: ComponentEntry = {
    name,
    group,
    package: packageName,
    path: relComponentRoot,
  };

  if (styles) {
    entry.styles = styles;
  }

  if (publicExports.length) {
    entry.exports =
      publicExports;
  }

  if (dependencies.length) {
    entry.dependencies =
      dependencies;
  }

  if (storyIndex) {
    const storiesFile =
      srcFiles.find(
        (file) =>
          /\.stories\.tsx?$/.test(
            file
          ) &&
          isConventional(
            file,
            normalizedName
          )
      );

    const key = storiesFile
      ? `${relComponentRoot}/src/${storiesFile}`
      : null;

    const story = key
      ? storyIndex.get(key)
      : undefined;

    if (story) {
      entry.story = story;
    }
  }

  if (nested.length) {
    entry.nested = nested;
  }

  if (contexts.length) {
    entry.contexts =
      contexts;
  }

  if (extras.length) {
    entry.extras = extras;
  }

  return entry;
}

interface StorybookIndexEntry {
  id: string;
  type?: string;
  importPath?: string;
}

function isStorybookIndexEntry(
  value: unknown
): value is StorybookIndexEntry {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (
      value as {
        id?: unknown;
      }
    ).id === "string"
  );
}

function loadStoryIndex(
  indexPath: string
): Map<string, string> {
  const result =
    new Map<string, string>();

  let raw: unknown;

  try {
    raw = JSON.parse(
      fs.readFileSync(
        indexPath,
        "utf8"
      )
    );
  } catch {
    return result;
  }

  const entries =
    typeof raw === "object" &&
    raw !== null
      ? (
          raw as {
            entries?: unknown;
          }
        ).entries
      : undefined;

  if (
    typeof entries !== "object" ||
    entries === null
  ) {
    return result;
  }

  const byStoriesFile =
    new Map<
      string,
      {
        docsId?: string;
        storyId?: string;
      }
    >();

  for (
    const entry of
    Object.values(entries)
  ) {
    if (
      !isStorybookIndexEntry(
        entry
      ) ||
      typeof entry.importPath !==
        "string"
    ) {
      continue;
    }

    const storiesFile =
      entry.importPath.replace(
        /^\.\//,
        ""
      );

    const existing =
      byStoriesFile.get(
        storiesFile
      ) ?? {};

    if (
      entry.type === "docs" &&
      !existing.docsId
    ) {
      existing.docsId =
        entry.id;
    }

    if (
      entry.type === "story" &&
      !existing.storyId
    ) {
      existing.storyId =
        entry.id;
    }

    byStoriesFile.set(
      storiesFile,
      existing
    );
  }

  for (
    const [
      storiesFile,
      ids,
    ] of byStoriesFile
  ) {
    const chosen =
      ids.docsId ??
      ids.storyId;

    if (chosen) {
      result.set(
        storiesFile,
        chosen
      );
    }
  }

  return result;
}

/**
 * Adds repository-specific metadata for shared packages when that information
 * can be derived deterministically from the source tree.
 */
function enrichSharedEntries(
  sharedEntries: Record<
    string,
    SharedEntry
  >,
  cwd: string
): Record<
  string,
  SharedEntry
> {
  const shared =
    Object.fromEntries(
      Object.entries(
        sharedEntries
      ).map(
        ([key, value]) => [
          key,
          { ...value },
        ]
      )
    );

  const icons =
    shared.icons;

  if (icons) {
    const assets =
      path.posix.join(
        icons.path,
        "src/assets"
      );

    const absoluteAssetsPath =
      path.join(
        cwd,
        ...assets.split("/")
      );

    shared.icons = {
      ...icons,
      assets,
      exportNaming:
        "arrow-left.svg -> ArrowLeftIcon",
      available:
        collectIconExports(
          absoluteAssetsPath
        ),
    };
  }

  return shared;
}

export function generateSourceMap(
  config: SourceMapConfig
): SourceMapDocument {
  const workspaces =
    getYarnWorkspaces(
      config.cwd
    );

  const workspaceByLocation =
    new Map(
      workspaces.map(
        (workspace) => [
          toPosix(
            workspace.location
          ),
          workspace.name,
        ]
      )
    );

  const storyIndex =
    config.storybookIndexPath &&
    fs.existsSync(
      path.join(
        config.cwd,
        config.storybookIndexPath
      )
    )
      ? loadStoryIndex(
          path.join(
            config.cwd,
            config.storybookIndexPath
          )
        )
      : null;

  const components:
    ComponentEntry[] = [];

  for (
    const [
      group,
      groupDirRel,
    ] of Object.entries(
      config.groups
    )
  ) {
    const groupDir =
      path.join(
        config.cwd,
        groupDirRel
      );

    for (
      const name of
      listDirs(groupDir)
    ) {
      components.push(
        buildComponentEntry(
          group,
          groupDir,
          name,
          workspaceByLocation,
          config.cwd,
          config.stylesRoot,
          storyIndex
        )
      );
    }
  }

  components.sort(
    (a, b) =>
      compareStrings(
        a.group,
        b.group
      ) ||
      compareStrings(
        a.name,
        b.name
      )
  );

  return {
    schema: 1,

    repo: {
      name: config.repoName,
      packageManager: "yarn",
    },

    commands:
      config.commands,

    conventions: {
      componentRoot:
        "Use components[].path; fallback is {groups[group]}/{ComponentName}",

      entry:
        "src/index.ts",

      implementation:
        "src/*.tsx",

      implementationNaming:
        "Implementation keeps the component casing, e.g. Link.tsx",

      types:
        "src/*.types.ts",

      typesNaming:
        "Types usually use lower camel case, e.g. link.types.ts",

      test:
        "src/*.spec.tsx",

      testNaming:
        "Tests usually use lower camel case, e.g. link.spec.tsx",

      stories:
        "src/*.stories.tsx",

      storiesNaming:
        "Stories usually use lower camel case, e.g. link.stories.tsx",

      docs:
        "src/*.docs.json",

      nested:
        "src/components/*/",

      contexts:
        "src/contexts/*/",

      styles:
        "Use components[].styles when present",

      exports:
        "Public exports resolved from src/index.ts and src/components/index.ts",

      dependencies:
        "Nimbus package imports under src; specs, stories and demo are excluded",
    },

    groups:
      config.groups,

    components,

    shared:
      enrichSharedEntries(
        config.shared,
        config.cwd
      ),

    newComponent: {
      reference:
        config.newComponentReference,
    },
  };
}