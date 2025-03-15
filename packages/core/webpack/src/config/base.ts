/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */
import webpack from "webpack";
import merge from "webpack-merge";
import { Configuration } from "webpack";

import { arrayFilterEmpty, isProduction } from "../utils";
import { typescriptRule, svgRule } from "../rules";
import {
  dtsBundleGeneratorPlugin,
  UseClientInjectionPlugin,
  UseClientInjectionPluginOptions,
  MoveFilesIntoDistFolderPluginOptions,
  MoveFilesIntoDistFolderPlugin,
} from "../plugins";
import { aliasItems } from "./alias";
import { externalItems } from "./external";

import production from "./production";
import development from "./development";

const webpackBase = (
  dtsBundleConfig?: { entries: string[] },
  packageJsonConfig?: MoveFilesIntoDistFolderPluginOptions,
  useClientInjectionOptions?: UseClientInjectionPluginOptions
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
    new webpack.DefinePlugin({
      process: JSON.stringify({}),
    }),
    dtsBundleGeneratorPlugin(dtsBundleConfig),
    new MoveFilesIntoDistFolderPlugin(packageJsonConfig),
    new UseClientInjectionPlugin(useClientInjectionOptions),
  ],
  resolve: {
    alias: aliasItems,
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      process: require.resolve("process/browser"),
    },
  },
  externals: externalItems,
});

export const getConfiguration = (
  config?: Configuration,
  extraParams?: {
    dtsBundleConfig?: { entries: string[] };
    packageJsonConfig?: MoveFilesIntoDistFolderPluginOptions;
    useClientInjectionOptions?: any;
  }
) =>
  isProduction
    ? merge(
        webpackBase(
          extraParams?.dtsBundleConfig,
          extraParams?.packageJsonConfig,
          extraParams?.useClientInjectionOptions
        ),
        production,
        config || {}
      )
    : merge(webpackBase(), development, config || {});

export default getConfiguration();
