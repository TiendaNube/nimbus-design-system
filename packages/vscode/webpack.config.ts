import path from "path";
import { configuration } from "@nimbus-ds/webpack/src";

const baseConfig = {
  target: "webworker",
  entry: "./src/index.ts",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "extension.js",
    libraryTarget: "commonjs2",
  },
  externals: {
    vscode: "commonjs vscode",
    node_modules: "node_modules",
  },
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: [".ts", ".js"],
    mainFields: ["browser", "module", "main"],
  },
  devtool: "nosources-source-map",
  infrastructureLogging: {
    level: "log", // enables logging required for problem matchers
  },
};

const config = configuration.getConfiguration(baseConfig as any);
Reflect.deleteProperty(config, "plugins");

export default () => config;
