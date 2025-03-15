import path from "path";

import { plugins, rules, configuration, utils } from "@nimbus-ds/webpack/src";

const baseConfig = {
  entry: {
    "./themes/dark": "./src/themes/nimbus-theme-dark.css.ts",
    "./themes/next": "./src/themes/nimbus-theme-next.css.ts",
    "./themes/next-dark": "./src/themes/nimbus-theme-nextDark.css.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/styles",
  },
  module: { rules: [rules.cssLoaderExtractRule] },
};

const config = configuration.getConfiguration(baseConfig);
delete config.plugins;
config.plugins = [
  plugins.vanillaExtractPlugin,
  plugins.miniCssExtractPlugin,
  plugins.cssHashRemoverPlugin,
  plugins.dtsBundleGeneratorPlugin({
    entries: [
      `node ${utils.rootDir}/node_modules/.bin/dts-bundle-generator -o ./dist/index.d.ts ./src/index.ts`,
      `node ${utils.rootDir}/node_modules/.bin/dts-bundle-generator -o ./dist/themes/dark.d.ts ./src/themes/nimbus-theme-dark.css.ts`,
    ],
  }),
  new plugins.MovePackageJsonPlugin(),
  new plugins.UseClientInjectionPlugin(),
];

export default () => config;
