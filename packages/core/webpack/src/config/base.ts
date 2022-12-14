/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */
import merge from "webpack-merge";
import { Configuration } from "webpack";

import { arrayFilterEmpty, isProduction } from "../utils";
import { typescriptRule, svgRule } from "../rules";
import { dtsBundleGeneratorPlugin } from "../plugins";
import { aliasItems } from "./alias";
import { externalItems } from "./external";

import production from "./production";
import development from "./development";

const webpack: Configuration = {
  mode: isProduction ? "production" : "development",
  entry: {
    "./index": "./src/index.ts",
  },
  output: {
    filename: "[name].js",
    libraryTarget: "umd",
  },
  module: {
    rules: arrayFilterEmpty([typescriptRule, svgRule]),
  },
  plugins: [dtsBundleGeneratorPlugin],
  resolve: {
    alias: aliasItems,
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: externalItems,
};

export const getConfiguration = (config?: Configuration) =>
  isProduction
    ? merge(webpack, production, config || {})
    : merge(webpack, development, config || {});

export default getConfiguration();
