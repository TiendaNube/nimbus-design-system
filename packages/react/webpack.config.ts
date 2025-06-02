import path from "path";
import { configuration, utils } from "@nimbus-ds/webpack";

const baseDir = path.resolve(__dirname, "src");

const { dtsCommands, packageExports, webpackEntries } =
  utils.getComponentsPackageExports(baseDir, ["atomic", "composite"]);

const baseConfig = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/components",
  },
  entry: webpackEntries,
};

const config = configuration.getConfiguration(baseConfig, {
  dtsBundleConfig: {
    entries: [
      `node ../../node_modules/.bin/dts-bundle-generator -o ./dist/index.d.ts ./src/index.ts`,
      ...dtsCommands,
    ],
  },
  packageJsonConfig: {
    transform: (packageJson: any) => {
      packageJson.exports = {
        // Add the main export
        ".": {
          import: "./dist/index.js",
          require: "./dist/index.js",
        },
        // Component props export
        "./components-props.json": {
          import: "./dist/components-props.json",
          require: "./dist/components-props.json",
        },
        ...packageExports,
      };
      return packageJson;
    },
    files: ["CHANGELOG.md", "README.md", "components-props.json"],
  },
});

delete config.externals;
config.externals = configuration.externalLibs;

export default () => config;
