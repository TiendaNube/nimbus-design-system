// import fastGlob from "fast-glob";
// import path from "path";
// import fs from "fs-extra";
// import { rootDir } from "./constants";

export const arrayFilterEmpty = (
  array: {
    test: RegExp;
    loader?: string;
    use?: any;
    exclude?: RegExp;
  }[]
) => array.filter((x) => !!x);

export const getComponentsPackageExports = (
  baseDir: string,
  folders: string[]
) => {
  const packageExports: Record<string, { import: string; require: string }> =
    {};
  const webpackEntries: Record<string, string> = {};
  const dtsCommands: string[] = [];

  // const allComponents = folders
  //   .map((folder) =>
  //     fastGlob.sync(`${folder}/*`, {
  //       cwd: baseDir,
  //       onlyDirectories: true,
  //     })
  //   )
  //   .flat();

  // // Process each component folder
  // allComponents.forEach((componentPath) => {
  //   const componentName = path.basename(componentPath);
  //   const componentDir = path.join(baseDir, componentPath);

  //   let entryFile = path.join(componentDir, "src", "index.ts");

  //   const extraCommands = [];
  //   // 2. If a src/components folder exists, generate a temporary file to aggregate exports
  //   const componentsDir = path.join(componentDir, "src", "components");
  //   if (fs.existsSync(componentsDir)) {
  //     const tempFilePath = path.join(
  //       componentDir,
  //       "src",
  //       "build-temp--index.ts"
  //     );

  //     // The temp file re-exports the main index and the sub-components
  //     const tempContent = `
  //     export * from "./index";
  //     export * from "./components/index";
  //   `;
  //     fs.writeFileSync(tempFilePath, tempContent, "utf8");

  //     entryFile = tempFilePath; // override entry to use the temp file

  //     extraCommands.push(`&& rm ${tempFilePath}`); // Cleanup the temp file after running the DTS command
  //   }

  //   // 3. Build the webpack entry. Using a relative path works well with webpack.
  //   webpackEntries[componentName] = entryFile;

  //   // 4. Prepare the DTS bundle generator command for this component, removing the temp file after running it for cleanup
  //   const dtsCommand = `node ${rootDir}/node_modules/.bin/dts-bundle-generator -o ./dist/${componentName}/index.d.ts ${entryFile} ${extraCommands.join(
  //     ""
  //   )}`; // ADD REMOVE HERE? && rm ${entryFile}`;
  //   dtsCommands.push(dtsCommand);

  //   // 5. Build the package exports for this component
  //   packageExports[`./${componentName}`] = {
  //     import: `./dist/${componentName}/index.js`,
  //     require: `./dist/${componentName}/index.js`,
  //   };
  // });

  return { packageExports, dtsCommands, webpackEntries };
};
