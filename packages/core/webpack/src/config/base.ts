/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */
import merge from "webpack-merge";
import { Configuration } from "webpack";

import { arrayFilterEmpty, isProduction } from "../utils";
import { typescriptRule, svgRule } from "../rules";
import { dtsBundleGeneratorPlugin, UseClientInjectionPlugin } from "../plugins";
import { aliasItems } from "./alias";
import { externalItems } from "./external";

import production from "./production";
import development from "./development";
import MovePackageJsonPlugin, {
  MovePackageJsonPluginOptions,
} from "../plugins/MovePackageJsonPlugin";

const webpack = (
  dtsBundleConfig?: { entries: string[] },
  packageJsonConfig?: MovePackageJsonPluginOptions
): Configuration => ({
  target: "node",
  mode: isProduction ? "production" : "development",
  entry: {
    "./index": "./src/index.ts",
  },
  output: {
    filename: (pathData) => {
      return pathData.chunk?.name === "./index"
        ? "[name].js"
        : "[name]/index.js";
    },
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
    new MovePackageJsonPlugin(packageJsonConfig),
    new UseClientInjectionPlugin(),
  ],
  resolve: {
    alias: aliasItems,
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: externalItems,
});

export const getConfiguration = (
  config?: Configuration,
  extraParams?: {
    dtsBundleConfig?: { entries: string[] };
    packageJsonConfig?: MovePackageJsonPluginOptions;
  }
) =>
  isProduction
    ? merge(
        webpack(extraParams?.dtsBundleConfig, extraParams?.packageJsonConfig),
        production,
        config || {}
      )
    : merge(webpack(), development, config || {});

export default getConfiguration();
