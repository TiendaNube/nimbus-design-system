// CleanupTempFilesPlugin.ts
import { Compiler } from "webpack";
import fs from "fs-extra";
import path from "path";
import fastGlob from "fast-glob";

export interface CleanupTempFilesPluginOptions {
  // The glob pattern to match temporary files that should be removed. Defaults to **/temp-index.ts.
  pattern?: string;
  /**
   * The base directory to search in.
   * Defaults to the "src" directory inside the webpack context.
   */
  baseDir?: string;
}

class CleanupTempFilesPlugin {
  private options: CleanupTempFilesPluginOptions;

  constructor(options: CleanupTempFilesPluginOptions = {}) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    compiler.hooks.done.tapPromise("CleanupTempFilesPlugin", async () => {
      // Determine the base directory to search for temporary files
      const defaultBaseDir = path.resolve(compiler.context, "src");
      const searchDir = this.options.baseDir
        ? path.resolve(compiler.context, this.options.baseDir)
        : defaultBaseDir;
      // Use the provided pattern or default to "**/temp-index.ts"
      const pattern = this.options.pattern || "**/temp-index.ts";

      try {
        const tempFiles = await fastGlob(pattern, { cwd: searchDir });
        await Promise.all(
          tempFiles.map(async (relativeFilePath) => {
            const absoluteFilePath = path.join(searchDir, relativeFilePath);
            if (await fs.pathExists(absoluteFilePath)) {
              await fs.remove(absoluteFilePath);
              console.log(`Removed temporary file: ${absoluteFilePath}`);
            }
          })
        );
      } catch (error) {
        console.error("Error cleaning up temporary files:", error);
      }
    });
  }
}

export default CleanupTempFilesPlugin;
