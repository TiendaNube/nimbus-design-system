import fs from "fs";
import { compareStrings } from "./compareStrings";
import { listRuntimeSourceFiles } from "./fileSystem";

/**
 * Finds Nimbus packages referenced by the component source.
 *
 * Specs, tests, stories and demo directories are intentionally ignored so
 * this field describes implementation dependencies rather than test/example
 * dependencies.
 */
export function collectNimbusDependencies(
  srcDir: string,
  ownPackage: string
): string[] {
  const dependencies = new Set<string>();

  const importRegex =
    /(?:from\s+|import\s*\(\s*|import\s+|require\s*\(\s*)["'](@nimbus-ds\/[^"']+)["']/g;

  for (const file of listRuntimeSourceFiles(srcDir)) {
    const content = fs.readFileSync(file, "utf8");

    importRegex.lastIndex = 0;

    for (
      let match = importRegex.exec(content);
      match;
      match = importRegex.exec(content)
    ) {
      const dependency = match[1];

      if (dependency !== ownPackage) {
        dependencies.add(dependency);
      }
    }
  }

  return [...dependencies].sort(compareStrings);
}
