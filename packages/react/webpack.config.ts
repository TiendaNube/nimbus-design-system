import path from "path";
import { configuration } from "@nimbus-ds/webpack";

// import { PackageJson } from "type-fest";

// const baseDir = path.resolve(__dirname, "src");

// const { dtsCommands, packageExports, webpackEntries } =
//   utils.getComponentsPackageExports(baseDir, ["atomic", "composite"]);

const baseConfig = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/components",
  },
  // entry: webpackEntries,
};

const config = configuration.getConfiguration(baseConfig);

// const config = configuration.getConfiguration(baseConfig, {
//   dtsBundleConfig: {
//     entries: [
//       `node ../..//node_modules/.bin/dts-bundle-generator -o ./dist/index.d.ts ./src/index.ts`,
//       // ...dtsCommands,
//     ],
//   },
//   packageJsonConfig: {
//     transform: (packageJson: any) => {
//       packageJson.exports = {
//         // Add the main export
//         ".": {
//           import: "./dist/index.js",
//           require: "./dist/index.js",
//         },
//         // ...packageExports,
//       };
//       return packageJson;
//     },
//   },
//   useClientInjectionOptions: { shouldInject: true },
// });

delete config.externals;
config.externals = configuration.externalLibs;

export default () => config;
