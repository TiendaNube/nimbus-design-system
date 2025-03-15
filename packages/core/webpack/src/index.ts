import {
  getConfiguration,
  development,
  production,
  base,
  externalLibs,
  aliasItems,
} from "./config";
import {
  vanillaExtractPlugin,
  miniCssExtractPlugin,
  dtsBundleGeneratorPlugin,
  cssHashRemoverPlugin,
  cssMinimizerPlugin,
  UseClientInjectionPlugin
} from "./plugins";
import MovePackageJsonPlugin from "./plugins/MovePackageJsonPlugin";
import {
  cssLoaderExtractRule,
  styleLoaderCssRule,
  miniCssExtractRule,
  typescriptRule,
  svgRule,
} from "./rules";
import {
  rootDir,
  arrayFilterEmpty,
  isProduction,
  isDevelopment,
} from "./utils";

export const rules = {
  cssLoaderExtractRule,
  styleLoaderCssRule,
  miniCssExtractRule,
  typescriptRule,
  svgRule,
};
export const plugins = {
  vanillaExtractPlugin,
  miniCssExtractPlugin,
  cssHashRemoverPlugin,
  cssMinimizerPlugin,
  dtsBundleGeneratorPlugin,
  UseClientInjectionPlugin,
  MovePackageJsonPlugin
};
export const configuration = {
  aliasItems,
  externalLibs,
  development,
  production,
  base,
  getConfiguration,
};

export const utils = { rootDir, arrayFilterEmpty, isProduction, isDevelopment };

const webpack = {
  rules,
  plugins,
  configuration,
  utils,
};

export default webpack;
