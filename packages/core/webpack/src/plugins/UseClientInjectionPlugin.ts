// UseClientInjectionPlugin.ts
import { Compiler } from "webpack";
import { RawSource } from "webpack-sources";
import fs from "fs-extra";
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
    // Resolve the source file path based on the provided option or default to 'src/index.ts' for components
    const sourceFilePath = this.options.sourceFile
      ? path.resolve(compiler.context, this.options.sourceFile)
      : path.resolve(compiler.context, "src/index.ts");

    // Read the source file and check if its first non-empty line contains 'use client'
    if (fs.existsSync(sourceFilePath)) {
      try {
        const fileContent = fs.readFileSync(sourceFilePath, "utf8");
        const firstLine = fileContent.split("\n")[0].trim();
        if (firstLine === `"use client";` || firstLine === `'use client';`) {
          this.shouldInject = true;
        }
      } catch (err) {
        console.error(`Error reading ${sourceFilePath}:`, err);
      }
    }

    // Hook into the emit process of webpack
    compiler.hooks.emit.tapAsync(
      "UseClientInjectionPlugin",
      (compilation, callback) => {
        if (!this.shouldInject) {
          // Skip injecting if the source file didn't include "use client"
          callback();
          return;
        }
        Object.keys(compilation.assets).forEach((assetName) => {
          if (assetName.endsWith(".js")) {
            const asset = compilation.assets[assetName];
            let source = asset.source().toString();

            // Only inject if it's not already present
            if (
              !source.startsWith(`"use client";`) &&
              !source.startsWith(`'use client';`)
            ) {
              source = `"use client";\n${source}`;
              compilation.assets[assetName] = new RawSource(source) as any;
              console.log(`Injected "use client" in: ${assetName}`);
            }
          }
        });
        callback();
      }
    );
  }
}

export { UseClientInjectionPlugin };
