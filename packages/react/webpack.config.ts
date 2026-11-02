import path from "path";
import { configuration, plugins, rules, utils } from "@nimbus-ds/webpack";
import { generateNextIndex } from "../../.scripts/generate-next-index";

const baseDir = path.resolve(__dirname, "src");
const nextDir = path.resolve(baseDir, "next");
const nextEntryFile = path.resolve(nextDir, "index.ts");

generateNextIndex(nextDir);

const { dtsCommands, packageExports, webpackEntries } =
  utils.getComponentsPackageExports(baseDir, ["atomic", "composite"]);

webpackEntries["./next"] = nextEntryFile;

const baseConfig = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/components",
  },
  entry: webpackEntries,
  module: {
    rules: [rules.cssLoaderExtractRule],
  },
};

const componentPropsJson = "components-props.json";

const config = configuration.getConfiguration(baseConfig, {
  dtsBundleConfig: {
    entries: [
      `node ../../node_modules/.bin/dts-bundle-generator --no-check -o ./dist/index.d.ts ./src/index.ts`,
      `node ../../node_modules/.bin/dts-bundle-generator --no-check -o ./dist/next/index.d.ts ./src/next/index.ts`,
      ...dtsCommands,
    ],
  },
  packageJsonConfig: {
    transform: (packageJson: any) => {
      packageJson.files = Array.from(
        new Set([...(packageJson.files || ["dist", "README.md"]), "next"])
      );
      packageJson.typesVersions = {
        "*": {
          next: ["./dist/next/index.d.ts"],
        },
      };
      packageJson.exports = {
        // Add the main export
        ".": {
          import: "./dist/index.js",
          require: "./dist/index.js",
        },
        // Aggregate /next subpath export (Decision 0082)
        "./next": {
          types: "./dist/next/index.d.ts",
          import: "./dist/next/index.js",
          require: "./dist/next/index.js",
        },
        // Component props export
        [`./${componentPropsJson}`]: {
          import: `./dist/${componentPropsJson}`,
          require: `./dist/${componentPropsJson}`,
        },
        ...packageExports,
      };
      return packageJson;
    },
    files: ["CHANGELOG.md", "README.md"],
  },
});

config.plugins = [
  plugins.vanillaExtractPlugin,
  plugins.miniCssExtractPlugin,
  plugins.cssHashRemoverPlugin,
  ...(config.plugins || []),
];

delete config.externals;
config.externals = configuration.externalLibs;

export default () => config;
