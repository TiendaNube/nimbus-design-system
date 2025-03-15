import path from "path";
import { configuration } from "@nimbus-ds/webpack/src";

const baseConfig = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/components",
  },
  entry: {
    Text: "./src/atomic/Text/src/deep.ts",
    Box: "./src/atomic/Box/src/index.ts",
    Icon: "./src/atomic/Icon/src/index.ts",
    List: "./src/atomic/List/src/deep.ts",
  },
};

const config = configuration.getConfiguration(baseConfig);

delete config.externals;
config.externals = configuration.externalLibs;

export default () => config;
