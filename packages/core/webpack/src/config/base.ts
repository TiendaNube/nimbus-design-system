/**
 *
 * Base webpack configuration for Nimbus Design System packages.
 * This configuration is shared across all packages in the monorepo.
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

/**
 * Creates the base webpack configuration for a package.
 *
 * @param dtsBundleConfig - Configuration for generating TypeScript declaration files
 * @param packageJsonConfig - Package.json configuration for the current package
 * @param useClientInjectionOptions - Options for client-side code injection
 * @returns A webpack configuration object
 */
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
    // Disable path info for faster buildsis
    pathinfo: false,
  },
  module: {
    rules: arrayFilterEmpty([typescriptRule, svgRule]),
  },
  plugins: [
    dtsBundleGeneratorPlugin(dtsBundleConfig),
    new MoveFilesIntoDistFolderPlugin(packageJsonConfig),
    new UseClientInjectionPlugin(useClientInjectionOptions),
  ].filter(Boolean),
  resolve: {
    alias: aliasItems,
    extensions: [".tsx", ".ts", ".js"],
    // Improve resolution performance
    symlinks: false,
    cacheWithContext: false,
  },
  /**
   * External dependencies configuration.
   *
   * The `externals` field tells webpack which modules should be treated as external dependencies.
   * These modules will not be bundled with the package but will be expected to be available
   * in the runtime environment.
   */
  externals: externalItems,
  // Performance optimizations (conservative for monorepo compatibility)
  optimization: {
    // Only optimize what's safe in a monorepo context
    minimize: isProduction,
    // Keep these disabled to avoid issues with workspace dependencies
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    // Disable in development for faster builds
    providedExports: isProduction,
    usedExports: isProduction,
    sideEffects: false,
  },
  // Enable build cache for faster subsequent builds
  cache: isProduction
    ? false // Disable cache in production for consistent builds
    : {
        type: "filesystem",
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: ".cache/webpack",
        name: `webpack-cache-${process.env.NODE_ENV || "development"}`,
      },
  // Improve build performance
  experiments: {
    cacheUnaffected: true,
  },
  // Reduce stat output for faster compilation
  stats: isProduction ? "errors-warnings" : "minimal",
});

/**
 * Gets the final webpack configuration by merging the base configuration with
 * environment-specific configurations (production or development).
 *
 * @param config - Additional webpack configuration to merge
 * @param extraParams - Additional parameters for the base configuration
 * @returns The final webpack configuration
 */
export const getConfiguration = (
  config?: Configuration,
  extraParams?: WebpackBaseConfig
) =>
  isProduction
    ? merge(webpack(extraParams), production, config || {})
    : merge(webpack(), development, config || {});

export default getConfiguration();
