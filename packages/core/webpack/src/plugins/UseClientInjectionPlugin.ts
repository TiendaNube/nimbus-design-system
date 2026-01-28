import { type Compiler } from "webpack";
import { existsSync, readFileSync } from "fs";
import path from "path";

/**
 * Options for the UseClientInjectionPlugin.
 */
export interface UseClientInjectionPluginOptions {
  /**
   * The source file to check for 'use client'. Defaults to 'src/index.ts'.
   */
  sourceFile?: string;
}

/**
 * A Webpack plugin that injects 'use client'; at the beginning of the asset if the original file contains 'use client' at first line.
 */
class UseClientInjectionPlugin {
  private options: UseClientInjectionPluginOptions;

  private shouldInject = false; // flag determining if injection should occur

  constructor(options: UseClientInjectionPluginOptions = {}) {
    this.options = options;
  }

  /**
   * Returns the first non-empty, non-comment line of the file.
   * It skips:
   * - Lines that are empty.
   * - Lines starting with // (or ///).
   * - Lines that are part of a block comment.
   */
  private getFirstNonCommentLine(content: string): string | null {
    const lines = content.split(/\r?\n/);
    let insideBlockComment = false;

    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();

      if (insideBlockComment) {
        if (trimmed.endsWith("*/")) {
          insideBlockComment = false;
        }
        // move to the next iteration implicitly
      } else if (trimmed.startsWith("/*")) {
        if (!trimmed.endsWith("*/")) {
          insideBlockComment = true;
        }
        // skip this line as it's a block comment
      } else if (trimmed.startsWith("//")) {
        // skip single-line comments
      } else if (trimmed === "") {
        // skip empty lines
      } else {
        return trimmed;
      }
    }
    return null;
  }

  apply(compiler: Compiler) {
    const sourceFilePath = this.options.sourceFile
      ? path.resolve(compiler.context, this.options.sourceFile)
      : path.resolve(compiler.context, "src/index.ts");

    // Read the source file and check if its first non-empty line contains 'use client'
    if (existsSync(sourceFilePath)) {
      try {
        const fileContent = readFileSync(sourceFilePath, "utf8");
        const firstLine = this.getFirstNonCommentLine(fileContent);
        if (firstLine === `"use client";` || firstLine === `'use client';`) {
          this.shouldInject = true;
        }
      } catch (err) {
        console.error(`Error reading ${sourceFilePath}:`, err);
      }
    }

    // Use the emit hook to modify assets before they are emitted.
    compiler.hooks.emit.tapAsync(
      "UseClientInjectionPlugin",
      (compilation, callback) => {
        if (!this.shouldInject) {
          return callback();
        }

        // Get RawSource from the webpack sources available in the compiler
        const { RawSource } = compiler.webpack.sources;

        Object.keys(compilation.assets).forEach((assetName) => {
          if (assetName.endsWith(".js")) {
            let source = compilation.assets[assetName].source().toString();

            if (
              !source.startsWith('"use client";') &&
              !source.startsWith("'use client';")
            ) {
              source = `"use client";\n${source}`;

              // Replace the asset with a new instance of RawSource. In the future we can improve this using the new Webpack 5 API,
              // but after a few tests it doesn't seem to work in the current architecture, it just doesn't update the asset at all.
              // eslint-disable-next-line no-param-reassign
              compilation.assets[assetName] = new RawSource(source);
              console.log(`Injected "use client" in: ${assetName}`);
            }
          }
        });

        return callback();
      }
    );
  }
}

export { UseClientInjectionPlugin };
