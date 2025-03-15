import { Compiler } from "webpack";
import { existsSync, readFileSync } from "fs";
import path from "path";

export interface UseClientInjectionPluginOptions {
  /**
   * The source file to check for 'use client'. Defaults to 'src/index.ts'.
   */
  sourceFile?: string;
}

class UseClientInjectionPlugin {
  private options: UseClientInjectionPluginOptions;
  private shouldInject: boolean = false; // flag determining if injection should occur

  constructor(options: UseClientInjectionPluginOptions = {}) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    const sourceFilePath = this.options.sourceFile
      ? path.resolve(compiler.context, this.options.sourceFile)
      : path.resolve(compiler.context, "src/index.ts");

    // Read the source file and check if its first non-empty line contains 'use client'
    if (existsSync(sourceFilePath)) {
      try {
        const fileContent = readFileSync(sourceFilePath, "utf8");
        const firstLine = fileContent.split("\n")[0].trim();
        if (firstLine === `"use client";` || firstLine === `'use client';`) {
          this.shouldInject = true;
        }
      } catch (err) {
        console.error(`Error reading ${sourceFilePath}:`, err);
      }
    }

    compiler.hooks.compilation.tap(
      "UseClientInjectionPlugin",
      (compilation) => {
        compilation.hooks.processAssets.tap(
          {
            name: "UseClientInjectionPlugin",
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE, // Ensure we modify assets at the right stage (one of the latest so it doesn't get overridden)
          },
          (assets) => {
            if (!this.shouldInject) return;

            for (const assetName in assets) {
              if (assetName.endsWith(".js")) {
                const asset = compilation.getAsset(assetName);
                if (!asset) continue;

                let source = asset.source.source().toString();

                if (
                  !source.startsWith('"use client";') &&
                  !source.startsWith("'use client';")
                ) {
                  source = `"use client";\n${source}`;

                  compilation.updateAsset(
                    assetName,
                    new compiler.webpack.sources.RawSource(source)
                  );

                  console.log(`Injected "use client" in: ${assetName}`);
                }
              }
            }
          }
        );
      }
    );
  }
}

export { UseClientInjectionPlugin };
