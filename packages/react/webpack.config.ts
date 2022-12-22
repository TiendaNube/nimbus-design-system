import path from "path";
import { configuration } from "@nimbus-ds/webpack/src";

const baseConfig = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/components",
  },
};

const config = configuration.getConfiguration(baseConfig);
delete config.externals;
config.externals = configuration.externalLibs;

export default () => config;
