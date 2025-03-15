import path from "path";
import { existsSync, writeFileSync, readdirSync, statSync } from "fs";
import { rootDir } from "./constants";

export const arrayFilterEmpty = (
  array: {
    test: RegExp;
    loader?: string;
    use?: any;
    exclude?: RegExp;
  }[]
) => array.filter((x) => !!x);

/**
 * Retrieves all subdirectories in a given list of folders.
 */
const getDirectories = (baseDir: string, folders: string[]) =>
  folders
    .map((folder) => {
      const folderPath = path.join(baseDir, folder);
      if (!existsSync(folderPath)) return [];

      return readdirSync(folderPath)
        .map((subfolder) => path.join(folder, subfolder)) // Maintain relative path
        .filter((subfolderPath) =>
          statSync(path.join(baseDir, subfolderPath)).isDirectory()
        );
    })
    .flat();

export const getComponentsPackageExports = (
  baseDir: string,
  folders: string[]
) => {
  const packageExports: Record<string, { import: string; require: string }> =
    {};
  const webpackEntries: Record<string, string> = {};
  const dtsCommands: string[] = [];

  const allComponents = getDirectories(baseDir, folders);

  // Process each component folder
  allComponents.forEach((componentPath) => {
    const componentName = path.basename(componentPath);
    const componentDir = path.join(baseDir, componentPath);

    let entryFile = path.join(componentDir, "src", "index.ts");

    const extraCommands = [];
    // 2. If a src/components folder exists, generate a temporary file to aggregate exports
    const componentsDir = path.join(componentDir, "src", "components");
    if (existsSync(componentsDir)) {
      const tempFilePath = path.join(
        componentDir,
        "src",
        "build-temp--index.ts"
      );

      // The temp file re-exports the main index and the sub-components
      const tempContent = `
      export * from "./index";
      export * from "./components/index";
    `;
      writeFileSync(tempFilePath, tempContent, "utf8");

      entryFile = tempFilePath; // override entry to use the temp file

      extraCommands.push(`&& rm ${tempFilePath}`); // Cleanup the temp file after running the DTS command
    }

    // 3. Build the webpack entry. Using a relative path works well with webpack.
    webpackEntries[componentName] = entryFile;

    // 4. Prepare the DTS bundle generator command for this component, removing the temp file after running it for cleanup
    const dtsCommand = `node ${rootDir}/node_modules/.bin/dts-bundle-generator -o ./dist/${componentName}/index.d.ts ${entryFile} ${extraCommands.join(
      ""
    )}`;
    dtsCommands.push(dtsCommand);

    // 5. Build the package exports for this component
    packageExports[`./${componentName}`] = {
      import: `./dist/${componentName}/index.js`,
      require: `./dist/${componentName}/index.js`,
    };
  });

  return { packageExports, dtsCommands, webpackEntries };
};
