/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */
import merge from "webpack-merge";
import { Configuration } from "webpack";

import { arrayFilterEmpty, isProduction, WebpackBaseConfig } from "../utils";
import { typescriptRule, svgRule } from "../rules";
import {
  dtsBundleGeneratorPlugin,
  UseClientInjectionPlugin,
  MoveFilesIntoDistFolderPlugin,
} from "../plugins";
import { aliasItems } from "./alias";
import { externalItems } from "./external";

import production from "./production";
import development from "./development";

const webpack = ({
  dtsBundleConfig,
  packageJsonConfig,
  useClientInjectionOptions,
}: WebpackBaseConfig = {}): Configuration => ({
  target: "node",
  mode: isProduction ? "production" : "development",
  entry: {
    "./index": "./src/index.ts",
  },
  output: {
    filename: (pathData) =>
      pathData.chunk?.name === "./index" ? "[name].js" : "[name]/index.js",
    library: {
      name: ["@nimbus-ds", "[name]"],
      type: "umd",
    },
    libraryTarget: "umd",
  },
  module: {
    rules: arrayFilterEmpty([typescriptRule, svgRule]),
  },
  plugins: [
    dtsBundleGeneratorPlugin(dtsBundleConfig),
    new MoveFilesIntoDistFolderPlugin(packageJsonConfig),
    new UseClientInjectionPlugin(useClientInjectionOptions),
  ],
  resolve: {
    alias: aliasItems,
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: externalItems,
});

export const getConfiguration = (
  config?: Configuration,
  extraParams?: WebpackBaseConfig
) =>
  isProduction
    ? merge(webpack(extraParams), production, config || {})
    : merge(webpack(), development, config || {});

export default getConfiguration();
