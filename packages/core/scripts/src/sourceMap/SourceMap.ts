import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { compareStrings } from "./compareStrings";
import type {
  ComponentEntry,
  SourceMapConfig,
  SourceMapDocument,
  YarnWorkspace,
} from "./SourceMap.types";

/**
 * Strips the known convention suffixes off a filename, in the order a file
 * can actually carry them (a spec is never also a stories file), so what is
 * left is the bare stem to compare against the component's own name.
 */
function stem(file: string): string {
  return file
    .replace(/\.spec\.tsx?$/, "")
    .replace(/\.stories\.tsx?$/, "")
    .replace(/\.types\.ts$/, "")
    .replace(/\.docs\.json$/, "")
    .replace(/\.tsx?$/, "");
}

/** `fileUploader`, `FileUploader` and `file-uploader` all name one component. */
function normalize(value: string): string {
  return value.toLowerCase().replace(/[-_]/g, "");
}

/**
 * A file belongs to the component's conventional set when its stem is the
 * component's own name — never by concatenating the name with a fixed
 * suffix, because casing is mixed within a single repo (`Box.tsx` next to
 * `box.types.ts`; `Sortable.types.ts` next to `appShell.types.ts`). Anything
 * whose stem does not match (a sibling export like `SliderRange.tsx`, a
 * `*.definitions.ts`, a loose asset) is generic, unclassified overflow —
 * `extras` — never a hardcoded exception list.
 */
function isConventional(file: string, normalizedName: string): boolean {
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

/** True when `value` has string `name` and `location` fields, narrowing it to `YarnWorkspace`. */
function isYarnWorkspace(value: unknown): value is YarnWorkspace {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { name?: unknown }).name === "string" &&
    typeof (value as { location?: unknown }).location === "string"
  );
}

/**
 * Drops every relative/empty PATH entry (".", "", "node_modules/.bin", …)
 * before resolving `yarn` — those are the writable-directory entries an
 * attacker could plant a fake binary in. Only fixed, absolute directories
 * stay, so `execSync` below can't be shadowed by a rogue PATH entry.
 */
function sanitizedPath(): string {
  return (process.env.PATH ?? "")
    .split(path.delimiter)
    .filter((entry) => path.isAbsolute(entry))
    .join(path.delimiter);
}

function getYarnWorkspaces(cwd: string): YarnWorkspace[] {
  // PATH is sanitized to absolute-only entries by sanitizedPath() below.
  const output = execSync("yarn workspaces list --json", {
    // NOSONAR
    encoding: "utf8",
    cwd,
    env: { ...process.env, PATH: sanitizedPath() },
  });

  return output
    .split("\n")
    .filter((line) => line.trim())
    .map((line): unknown => JSON.parse(line))
    .filter(isYarnWorkspace);
}

/**
 * Splits a component's `src/` files into the ones the conventions already
 * account for and everything else. `index.ts` is always conventional — it
 * is the entry point, and its stem ("index") never matches a component
 * name, so it needs an explicit pass rather than falling out of
 * `isConventional`.
 */
function classifySrcFiles(
  srcDir: string,
  files: string[],
  normalizedName: string
) {
  const unclaimed: string[] = [];
  const implementations: string[] = [];

  for (const file of files) {
    if (file === "index.ts" || file === "index.tsx") continue;
    if (isConventional(file, normalizedName)) {
      if (/\.tsx$/.test(file) && !/\.(spec|stories)\.tsx$/.test(file)) {
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

  return { unclaimed };
}

/** Direct children of `dir` only — conventions never look inside `src/components/*`. */
function listFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort(compareStrings);
}

function listDirs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(compareStrings);
}

function collectExtras(
  componentRoot: string,
  unclaimedSrcFiles: string[],
  unclaimedSrcDirs: string[]
): string[] {
  const topLevelExtras = fs.existsSync(componentRoot)
    ? fs
        .readdirSync(componentRoot, { withFileTypes: true })
        .map((entry) => entry.name)
        .filter((name) => name !== "src" && !IGNORED_TOP_LEVEL.has(name))
    : [];

  const srcFileExtras = unclaimedSrcFiles.map((name) =>
    path.posix.join("src", name)
  );
  // Trailing slash marks it as a directory, not a file, in the emitted list.
  const srcDirExtras = unclaimedSrcDirs.map(
    (name) => path.posix.join("src", name) + "/"
  );

  return [...topLevelExtras, ...srcFileExtras, ...srcDirExtras].sort(
    compareStrings
  );
}

function buildComponentEntry(
  group: string,
  groupDir: string,
  name: string,
  workspaceByLocation: Map<string, string>,
  cwd: string,
  storyIndex: Map<string, string> | null
): ComponentEntry {
  const componentRoot = path.join(groupDir, name);
  const srcDir = path.join(componentRoot, "src");
  const relComponentRoot = path
    .relative(cwd, componentRoot)
    .split(path.sep)
    .join("/");
  const normalizedName = normalize(name);

  const allSrcDirs = listDirs(srcDir);
  const knownSrcDirs = new Set(["components", "contexts"]);
  const unclaimedSrcDirs = allSrcDirs.filter((d) => !knownSrcDirs.has(d));

  const srcFiles = listFiles(srcDir);
  const { unclaimed } = classifySrcFiles(srcDir, srcFiles, normalizedName);

  const packageName = workspaceByLocation.get(relComponentRoot);
  if (!packageName) {
    throw new Error(
      `No yarn workspace found at ${relComponentRoot} — is ${name} missing its own package.json?`
    );
  }

  const nested = listDirs(path.join(srcDir, "components"));
  const contexts = listDirs(path.join(srcDir, "contexts"));
  const extras = collectExtras(componentRoot, unclaimed, unclaimedSrcDirs);

  const entry: ComponentEntry = {
    name,
    group,
    package: packageName,
  };

  if (storyIndex) {
    const storiesFile = srcFiles.find(
      (f) => /\.stories\.tsx?$/.test(f) && isConventional(f, normalizedName)
    );
    const key = storiesFile ? `${relComponentRoot}/src/${storiesFile}` : null;
    const story = key ? storyIndex.get(key) : undefined;
    if (story) entry.story = story;
  }
  if (nested.length) entry.nested = nested;
  if (contexts.length) entry.contexts = contexts;
  if (extras.length) entry.extras = extras;

  return entry;
}

interface StorybookIndexEntry {
  id: string;
  type?: string;
  importPath?: string;
}

/** True when `value` has a string `id` field, narrowing it to `StorybookIndexEntry`. */
function isStorybookIndexEntry(value: unknown): value is StorybookIndexEntry {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { id?: unknown }).id === "string"
  );
}

/**
 * Groups a Storybook `index.json` by the stories file each entry came from,
 * preferring a docs-page id over a story id — same precedence
 * `storybookPreviewLinks` uses, so the two never disagree about which link
 * represents a component. `story` is optional in the schema, so a malformed
 * or unreadable index is treated as absent rather than failing the run.
 */
function loadStoryIndex(indexPath: string): Map<string, string> {
  const result = new Map<string, string>();

  let raw: unknown;
  try {
    raw = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  } catch {
    return result;
  }

  const entries =
    typeof raw === "object" && raw !== null
      ? (raw as { entries?: unknown }).entries
      : undefined;
  if (typeof entries !== "object" || entries === null) return result;

  const byStoriesFile = new Map<
    string,
    { docsId?: string; storyId?: string }
  >();

  for (const entry of Object.values(entries)) {
    if (!isStorybookIndexEntry(entry) || typeof entry.importPath !== "string") {
      continue;
    }
    const storiesFile = entry.importPath.replace(/^\.\//, "");
    const existing = byStoriesFile.get(storiesFile) ?? {};
    if (entry.type === "docs" && !existing.docsId) existing.docsId = entry.id;
    if (entry.type === "story" && !existing.storyId)
      existing.storyId = entry.id;
    byStoriesFile.set(storiesFile, existing);
  }

  for (const [storiesFile, ids] of byStoriesFile) {
    const chosen = ids.docsId ?? ids.storyId;
    if (chosen) result.set(storiesFile, chosen);
  }

  return result;
}

export function generateSourceMap(config: SourceMapConfig): SourceMapDocument {
  const workspaces = getYarnWorkspaces(config.cwd);
  const workspaceByLocation = new Map(
    workspaces.map((w) => [w.location.split(path.sep).join("/"), w.name])
  );

  const storyIndex =
    config.storybookIndexPath &&
    fs.existsSync(path.join(config.cwd, config.storybookIndexPath))
      ? loadStoryIndex(path.join(config.cwd, config.storybookIndexPath))
      : null;

  const components: ComponentEntry[] = [];
  for (const [group, groupDirRel] of Object.entries(config.groups)) {
    const groupDir = path.join(config.cwd, groupDirRel);
    for (const name of listDirs(groupDir)) {
      components.push(
        buildComponentEntry(
          group,
          groupDir,
          name,
          workspaceByLocation,
          config.cwd,
          storyIndex
        )
      );
    }
  }

  // Stable regardless of filesystem enumeration order or `groups` key order.
  // Compared field by field, not concatenated: group "a"+name "bc" and group
  // "ab"+name "c" must not collide into the same sort key.
  components.sort(
    (a, b) => compareStrings(a.group, b.group) || compareStrings(a.name, b.name)
  );

  return {
    schema: 1,
    repo: { name: config.repoName, packageManager: "yarn" },
    commands: config.commands,
    conventions: {
      entry: "src/index.ts",
      implementation: "src/*.tsx",
      types: "src/*.types.ts",
      test: "src/*.spec.tsx",
      stories: "src/*.stories.tsx",
      docs: "src/*.docs.json",
      nested: "src/components/*/",
      contexts: "src/contexts/*/",
    },
    groups: config.groups,
    components,
    shared: config.shared,
    newComponent: { reference: config.newComponentReference },
  };
}
