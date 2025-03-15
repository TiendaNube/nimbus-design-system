import path, { join } from "path";
import { configuration } from "@nimbus-ds/webpack/src";
import fastGlob from "fast-glob";
import fs from "fs-extra";

// Aca tengo que:
// 1. Tener a mano la lista de componentes que quiero compilar, cada uno con: Nombre, path a entry point (deep.ts o index.ts) y path a su output.
// 2. Generar los entries de webpack con esa lista.
// 3. Generar el package.json en el dist con el 'export' con el contenido correspondiente para cada archivo.
// 4. Generar los d.ts de cada componente.

const baseDir = path.resolve(__dirname);
const srcDir = path.join(baseDir, "src");

// 1. Find all component directories in src/atomic and src/composite
const atomicComponents = fastGlob.sync("atomic/*", {
  cwd: srcDir,
  onlyDirectories: true,
});
const compositeComponents = fastGlob.sync("composite/*", {
  cwd: srcDir,
  onlyDirectories: true,
});

const allComponents = [...atomicComponents, ...compositeComponents];

// Objects to store webpack entries, DTS commands, and package exports
const webpackEntries: Record<string, string> = {};
const dtsCommands: string[] = [];
const packageExports: Record<string, { import: string; require: string }> = {};

// Add the main export
packageExports["."] = {
  import: "./dist/index.js",
  require: "./dist/index.js",
};

// Process each component folder
allComponents.forEach((componentPath) => {
  const componentName = path.basename(componentPath);
  const componentDir = path.join(srcDir, componentPath);

  let entryFile = path.join(componentDir, "src", "index.ts");

  // 2. If a src/components folder exists, generate a temporary file to aggregate exports
  const componentsDir = path.join(componentDir, "src", "components");
  if (fs.existsSync(componentsDir)) {
    const tempFilePath = path.join(componentDir, "src", "temp-index.ts");

    // The temp file re-exports the main index and the sub-components
    const tempContent = `
      export * from "./index";
      export * from "./components/index";
    `;
    fs.writeFileSync(tempFilePath, tempContent, "utf8");

    entryFile = tempFilePath; // override entry to use the temp file
  }

  // 3. Build the webpack entry. Using a relative path works well with webpack.
  webpackEntries[componentName] = entryFile;

  // 4. Prepare the DTS bundle generator command for this component
  const rootDir = join(__dirname, "../../");
  const dtsCommand = `node ${rootDir}/node_modules/.bin/dts-bundle-generator -o ./dist/${componentName}/index.d.ts ${entryFile}`;
  dtsCommands.push(dtsCommand);

  // 5. Build the package exports for this component
  packageExports[`./${componentName}`] = {
    import: `./dist/${componentName}/index.js`,
    require: `./dist/${componentName}/index.js`,
  };
});

const baseConfig = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/components",
  },
  entry: webpackEntries,
};

export const rootDir = join(__dirname, "../../");

const config = configuration.getConfiguration(baseConfig, {
  dtsBundleConfig: {
    entries: [
      `node ${rootDir}/node_modules/.bin/dts-bundle-generator -o ./dist/index.d.ts ./src/index.ts`,
      ...dtsCommands,
    ],
  },
  packageJsonConfig: {
    transform: (packageJson) => {
      packageJson.exports = packageExports;
      return packageJson;
    },
  },
});

delete config.externals;
config.externals = configuration.externalLibs;

export default () => config;
