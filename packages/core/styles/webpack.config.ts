import path from "path";

// import { plugins, rules, configuration, utils } from "@nimbus-ds/webpack/src";
import { rules, configuration, plugins } from "@nimbus-ds/webpack/src";

const baseConfig = {
  // entry: {
  //   "./themes/dark": "./src/themes/nimbus-theme-dark.css.ts",
  // },
  // mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/styles",
  },
  module: { rules: [rules.cssLoaderExtractRule] },
};

const config = configuration.getConfiguration(baseConfig as any);
delete config.plugins;
config.plugins = [
  plugins.vanillaExtractPlugin,
  plugins.miniCssExtractPlugin,
  plugins.cssHashRemoverPlugin,

  // plugins.dtsBundleGeneratorPlugin({
  //   entries: [
  //     `node ${utils.rootDir}/node_modules/.bin/dts-bundle-generator -o ./dist/index.d.ts ./src/index.ts`,
  //     `node ${utils.rootDir}/node_modules/.bin/dts-bundle-generator -o ./dist/themes/dark.d.ts ./src/themes/dark.css.ts`,
  //   ],
  // }),
];

export default () => config;
