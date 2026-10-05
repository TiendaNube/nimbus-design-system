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
  const doc = generateSourceMap(config);
  const generated = writeYaml(doc);
  const check = process.argv.includes("--check");

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
