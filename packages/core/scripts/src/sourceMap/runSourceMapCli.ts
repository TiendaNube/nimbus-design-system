import fs from "fs";
import path from "path";
import { generateSourceMap } from "./SourceMap";
import { writeYaml } from "./writeYaml";
import type { SourceMapConfig } from "./SourceMap.types";

/**
 * Thin CLI shared by both repos' `.scripts/build-source-map.ts` wrapper —
 * each repo only supplies its own `SourceMapConfig`. `--check` regenerates
 * in memory and fails without touching disk if the committed file would
 * change, so CI can catch a stale map without a git-diff dance in the
 * workflow file itself.
 */
export function runSourceMapCli(config: SourceMapConfig): void {
  const outPath = path.join(config.cwd, "nimbus-source-map.yml");
  const includeNextFlag = process.argv.includes("--include-next");
  const effectiveConfig: SourceMapConfig = includeNextFlag
    ? {
        ...config,
        groups: {
          ...config.groups,
          next: "packages/react/src/next",
        },
      }
    : config;

  const doc = generateSourceMap(effectiveConfig);
  const generated = writeYaml(doc);
  const check = process.argv.includes("--check");

  // Also validate any Path D components under packages/react/src/next in memory
  // so convention errors are caught in CI without causing git conflicts on nimbus-source-map.yml.
  const nextDir = path.join(config.cwd, "packages/react/src/next");
  if (!includeNextFlag && fs.existsSync(nextDir)) {
    const nextValidationDoc = generateSourceMap({
      ...config,
      groups: {
        ...config.groups,
        next: "packages/react/src/next",
      },
    });
    const nextComponents = nextValidationDoc.components.filter(
      (entry) => entry.group === "next"
    );
    for (const entry of nextComponents) {
      const entryPoint = path.join(nextDir, entry.name, "src", "index.ts");
      if (!fs.existsSync(entryPoint)) {
        throw new Error(
          `Next component "${entry.name}" in packages/react/src/next is missing required entry point "src/index.ts".`
        );
      }
    }
  }

  if (check) {
    const current = fs.existsSync(outPath)
      ? fs.readFileSync(outPath, "utf8")
      : null;
    if (current !== generated) {
      // eslint-disable-next-line no-console
      console.error(
        `nimbus-source-map.yml is out of date. Run \`yarn source-map\` and commit the result.`
      );
      process.exit(1);
    }
    // eslint-disable-next-line no-console
    console.log("nimbus-source-map.yml is up to date.");
    return;
  }

  fs.writeFileSync(outPath, generated);
  // eslint-disable-next-line no-console
  console.log(
    `Wrote ${outPath} (${config.repoName}: ${doc.components.length} components).`
  );
}
