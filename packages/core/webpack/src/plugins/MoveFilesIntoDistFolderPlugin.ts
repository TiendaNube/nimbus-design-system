import type { Compiler } from "webpack";
import { promises as fs } from "fs";
import path from "path";

/**
 * Webpack plugin to move files into the output directory after the build.
 * This is useful for moving files like README.md, CHANGELOG.md, etc. into the dist folder.
 * Also, it can transform the package.json file before writing it to the output directory (by default, it modifies it inplace).
 */
export interface MoveFilesIntoDistFolderPluginOptions {
  transform?: (packageJson: any) => any;
  packageJsonPath?: string;
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

          const projectRoot = compiler.context;
          const pkgPath = this.options.packageJsonPath
            ? path.resolve(projectRoot, this.options.packageJsonPath)
            : path.resolve(projectRoot, "package.json");

          // Read & transform package.json (overwriting in root)
          const packageJsonRaw = await fs.readFile(pkgPath, "utf-8");
          const packageJson = JSON.parse(packageJsonRaw);
          const transformedPackageJson = this.options.transform
            ? this.options.transform(packageJson)
            : packageJson;

          // Capture trailing whitespace from the original file.
          const trailingWhitespaceMatch = packageJsonRaw.match(/(\s*)$/);
          const trailingWhitespace = trailingWhitespaceMatch
            ? trailingWhitespaceMatch[1]
            : "";

          // Overwrite package.json in the root project, preserving trailing whitespace if it had it.
          const newPackageJsonContent =
            JSON.stringify(transformedPackageJson, null, 2) +
            trailingWhitespace;
          await fs.writeFile(pkgPath, newPackageJsonContent);

          // Move additional files (defaults: CHANGELOG.md, README.md)
          const filesToMove = this.options.files || [
            "CHANGELOG.md",
            "README.md",
          ];

          console.log(`Moving ${filesToMove.join(" & ")} to ${outputPath}`);
          await Promise.all(
            filesToMove.map(async (fileName) => {
              const sourcePath = path.resolve(compiler.context, fileName);
              const destFilePath = path.join(outputPath, fileName);
              try {
                await fs.copyFile(sourcePath, destFilePath);
              } catch (err: any) {
                if (err.code !== "ENOENT") throw err; // Ignore missing files
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
