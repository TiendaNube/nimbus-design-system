import path from "path";
import { configuration, plugins, utils } from "@nimbus-ds/webpack/src";

const baseConfig = {
  entry: { "./index": "./tmp/index.ts" },
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/icons",
  },
};

const config = configuration.getConfiguration(baseConfig);
delete config.plugins;
config.plugins = [
  plugins.dtsBundleGeneratorPlugin({
    entries: [
      `node ${utils.rootDir}/node_modules/.bin/dts-bundle-generator -o ./dist/index.d.ts ./tmp/index.ts`,
    ],
  }),
];

export default () => config;
