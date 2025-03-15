import { Compiler } from "webpack";
import fs from "fs-extra";
import path from "path";
import type { PackageJson } from "type-fest";

// Maintain old version for webpack 4 compatibility. To remove the warning and improve performance, we should add
// polyfills so our clients can use it with webpack 5.

export interface MoveFilesIntoDistFolderPluginOptions {
  /**
   * A function that accepts the original package.json content and returns the modified version.
   */
  transform?: (packageJson: PackageJson) => PackageJson;
  /**
   * Optionally override the path to the package.json file.
   */
  packageJsonPath?: string;
  /**
   * An array of additional file paths (relative to the project root) to be moved into the dist folder.
   * Defaults to ["CHANGELOG.md", "README.md"].
   */
  files?: string[];
}

export class MoveFilesIntoDistFolderPlugin {
  private options: MoveFilesIntoDistFolderPluginOptions;

  constructor(options: MoveFilesIntoDistFolderPluginOptions = {}) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    compiler.hooks.afterEmit.tapPromise(
      "MoveFilesIntoDistFolderPlugin",
      async () => {
        try {
          const outputPath = compiler.options.output.path;
          if (!outputPath) {
            throw new Error(
              "Output path is not defined in webpack configuration."
            );
          }

          // Use the project's root (compiler.context) for package.json and additional files.
          const projectRoot = compiler.context;
          // Resolve the package.json file (allowing an override via options)
          const pkgPath = this.options.packageJsonPath
            ? path.resolve(projectRoot, this.options.packageJsonPath)
            : path.resolve(projectRoot, "package.json");

          // Read the original package.json
          const packageJson: PackageJson = await fs.readJson(pkgPath);

          // Apply the user provided transform if available
          const transformedPackageJson = this.options.transform
            ? this.options.transform(packageJson)
            : packageJson;

          // Write the modified package.json to the output folder (e.g., dist)
          await fs.writeJson(pkgPath, transformedPackageJson, { spaces: 2 });

          // Determine the additional files to move, defaulting to ["CHANGELOG.md", "README.md"]
          const filesToMove = this.options.files || [
            "CHANGELOG.md",
            "README.md",
          ];

          console.log(`Moving ${filesToMove.join(" & ")} to ${outputPath}`);
          await Promise.all(
            filesToMove.map(async (fileName) => {
              const sourcePath = path.resolve(compiler.context, fileName);
              const destFilePath = path.join(outputPath, fileName);
              if (await fs.pathExists(sourcePath)) {
                await fs.copy(sourcePath, destFilePath);
              }
            })
          );
        } catch (error) {
          console.error("Error in MoveFilesIntoDistFolderPlugin:", error);
        }
      }
    );
  }
}
