import { Compiler } from "webpack";
import fs from "fs-extra";
import path from "path";

export interface MovePackageJsonPluginOptions {
  /**
   * A function that accepts the original package.json content and returns the modified version.
   */
  transform?: (packageJson: any) => any;
  /**
   * Optionally override the path to the package.json file.
   */
  packageJsonPath?: string;
}

class MovePackageJsonPlugin {
  private options: MovePackageJsonPluginOptions;

  constructor(options: MovePackageJsonPluginOptions = {}) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    compiler.hooks.afterEmit.tapPromise(
      "MovePackageJsonPlugin",
      async (compilation) => {
        try {
          const outputPath = compiler.options.output.path;
          if (!outputPath) {
            throw new Error(
              "Output path is not defined in webpack configuration."
            );
          }
          // Resolve the package.json file (allowing an override via options)
          const pkgPath = this.options.packageJsonPath
            ? path.resolve(compiler.context, this.options.packageJsonPath)
            : path.resolve(compiler.context, "package.json");
          const destPath = path.join(outputPath, "package.json");

          // Read the original package.json
          const packageJson = await fs.readJson(pkgPath);

          // If a transform function is provided, use it to transform the package.json content
          const transformedPackageJson = this.options.transform
            ? this.options.transform(packageJson)
            : packageJson;

          // Write the modified package.json to the output folder (e.g., dist)
          await fs.writeJson(destPath, transformedPackageJson, { spaces: 2 });
        } catch (error) {
          console.error("Error in MovePackageJsonPlugin:", error);
        }
      }
    );
  }
}

export default MovePackageJsonPlugin;
