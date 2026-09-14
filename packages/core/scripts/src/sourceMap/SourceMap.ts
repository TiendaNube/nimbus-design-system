import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import {
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

function getYarnWorkspaces(cwd: string): YarnWorkspace[] {
  const output = execSync("yarn workspaces list --json", {
    encoding: "utf8",
    cwd,
  });

  return output
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line));
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
    .sort();
}

function listDirs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
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

  return [...topLevelExtras, ...srcFileExtras, ...srcDirExtras].sort();
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

/**
 * Groups a Storybook `index.json` by the stories file each entry came from,
 * preferring a docs-page id over a story id — same precedence
 * `storybookPreviewLinks` uses, so the two never disagree about which link
 * represents a component.
 */
function loadStoryIndex(indexPath: string): Map<string, string> {
  const raw = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  const entries: Record<string, StorybookIndexEntry> = raw.entries ?? {};
  const byStoriesFile = new Map<
    string,
    { docsId?: string; storyId?: string }
  >();

  for (const entry of Object.values(entries)) {
    if (!entry.importPath) continue;
    const storiesFile = entry.importPath.replace(/^\.\//, "");
    const existing = byStoriesFile.get(storiesFile) ?? {};
    if (entry.type === "docs" && !existing.docsId) existing.docsId = entry.id;
    if (entry.type === "story" && !existing.storyId)
      existing.storyId = entry.id;
    byStoriesFile.set(storiesFile, existing);
  }

  const result = new Map<string, string>();
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
  components.sort((a, b) => (a.group + a.name).localeCompare(b.group + b.name));

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
