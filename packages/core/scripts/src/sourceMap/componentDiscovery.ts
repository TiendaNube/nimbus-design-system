import fs from "fs";
import path from "path";
import { compareStrings } from "./compareStrings";
import { listFiles, listDirs, toPosix } from "./fileSystem";
import { normalize, isConventional } from "./naming";
import { collectPublicExports } from "./publicExports";
import { collectNimbusDependencies } from "./dependencies";
import { resolveStylePath } from "./sharedMetadata";
import type { ComponentEntry } from "./SourceMap.types";

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
 * Reads the package name directly from a component's manifest.
 *
 * Component roots are already discovered from configured source groups, so
 * invoking Yarn only to rediscover the same workspace and its package name is
 * unnecessary.
 */
function readPackageName(
  componentRoot: string,
  relativeComponentRoot: string
): string {
  const packageJsonPath = path.join(componentRoot, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`Missing package.json at ${relativeComponentRoot}`);
  }

  let manifest: unknown;

  try {
    manifest = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  } catch {
    throw new Error(`Invalid package.json at ${relativeComponentRoot}`);
  }

  if (
    typeof manifest !== "object" ||
    manifest === null ||
    !("name" in manifest)
  ) {
    throw new Error(
      `Missing package name at ${relativeComponentRoot}/package.json`
    );
  }

  const name = Reflect.get(manifest, "name");

  if (typeof name !== "string" || !name.trim()) {
    throw new Error(
      `Missing package name at ${relativeComponentRoot}/package.json`
    );
  }

  return name;
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
    if (file === "index.ts" || file === "index.tsx") {
      continue;
    }

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

  return {
    unclaimed,
  };
}

/**
 * Collects files and directories that are not represented by standard source
 * map conventions.
 */
function collectExtras(
  componentRoot: string,
  unclaimedSrcFiles: string[],
  unclaimedSrcDirs: string[]
): string[] {
  const topLevelExtras = fs.existsSync(componentRoot)
    ? fs
        .readdirSync(componentRoot, {
          withFileTypes: true,
        })
        .map((entry) => entry.name)
        .filter((name) => name !== "src" && !IGNORED_TOP_LEVEL.has(name))
    : [];
  const srcFileExtras = unclaimedSrcFiles.map((name) =>
    path.posix.join("src", name)
  );
  const srcDirExtras = unclaimedSrcDirs.map(
    (name) => `${path.posix.join("src", name)}/`
  );

  return [...topLevelExtras, ...srcFileExtras, ...srcDirExtras].sort(
    compareStrings
  );
}

/**
 * Builds the source-map record for one component directory.
 */
export function buildComponentEntry(
  group: string,
  groupDir: string,
  name: string,
  cwd: string,
  stylesRoot: string | undefined,
  storyIndex: Map<string, string> | null
): ComponentEntry {
  const componentRoot = path.join(groupDir, name);
  const srcDir = path.join(componentRoot, "src");
  const relComponentRoot = toPosix(path.relative(cwd, componentRoot));
  const normalizedName = normalize(name);
  const allSrcDirs = listDirs(srcDir);
  const knownSrcDirs = new Set(["components", "contexts"]);
  const unclaimedSrcDirs = allSrcDirs.filter(
    (directory) => !knownSrcDirs.has(directory)
  );
  const srcFiles = listFiles(srcDir);
  const { unclaimed } = classifySrcFiles(srcDir, srcFiles, normalizedName);
  const packageName = readPackageName(componentRoot, relComponentRoot);
  const nested = listDirs(path.join(srcDir, "components"));
  const contexts = listDirs(path.join(srcDir, "contexts"));
  const extras = collectExtras(componentRoot, unclaimed, unclaimedSrcDirs);
  const styles = resolveStylePath(cwd, stylesRoot, group, name);
  const publicExports = collectPublicExports(componentRoot);
  const dependencies = collectNimbusDependencies(srcDir, packageName);
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
    entry.exports = publicExports;
  }

  if (dependencies.length) {
    entry.dependencies = dependencies;
  }

  if (storyIndex) {
    const storiesFile = srcFiles.find(
      (file) =>
        /\.stories\.tsx?$/.test(file) && isConventional(file, normalizedName)
    );
    const key = storiesFile ? `${relComponentRoot}/src/${storiesFile}` : null;
    const story = key ? storyIndex.get(key) : undefined;

    if (story) {
      entry.story = story;
    }
  }

  if (nested.length) {
    entry.nested = nested;
  }

  if (contexts.length) {
    entry.contexts = contexts;
  }

  if (extras.length) {
    entry.extras = extras;
  }

  return entry;
}
