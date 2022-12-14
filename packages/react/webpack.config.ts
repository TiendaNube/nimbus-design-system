import path from "path";
import { rules, configuration } from "@nimbus-ds/webpack/src";

const baseConfig = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/components",
  },
  module: { rules: [rules.styleLoaderCssRule] },
};

const config = configuration.getConfiguration(baseConfig);
delete config.externals;
config.externals = configuration.externalLibs;

export default () => config;
