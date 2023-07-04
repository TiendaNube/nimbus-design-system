import path from "path";
import { configuration } from "@nimbus-ds/webpack/src";

const baseConfig = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "extension.js",
    libraryTarget: "commonjs2",
  },
  externals: {
    vscode: "commonjs vscode",
  },
  devtool: "nosources-source-map",
  infrastructureLogging: {
    level: "log",
  },
};

const config = configuration.getConfiguration(baseConfig as any);
Reflect.deleteProperty(config, "plugins");

export default () => config;
