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

const webpack = (dtsBundleConfig?: { entries: string[] }): Configuration => ({
  target: "node",
  mode: isProduction ? "production" : "development",
  entry: {
    index: "./src/index.ts",
  },
  output: {
    filename: (pathData) => {
      return pathData.chunk?.name === "index" ? "[name].js" : "[name]/index.js";
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
  plugins: [dtsBundleGeneratorPlugin(dtsBundleConfig)],
  resolve: {
    alias: aliasItems,
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: externalItems,
});

export const getConfiguration = (
  config?: Configuration,
  extraParams?: {
    isClientSide?: boolean;
    dtsBundleConfig?: { entries: string[] };
  }
) =>
  isProduction
    ? merge(
        webpack(extraParams?.dtsBundleConfig),
        production,
        config || {},
        // For production, we need to inject the "use client" statement in the generated files if it's a client-side bundle
        extraParams?.isClientSide
          ? { plugins: [new UseClientInjectionPlugin()] }
          : {}
      )
    : merge(webpack(), development, config || {});

export default getConfiguration();
