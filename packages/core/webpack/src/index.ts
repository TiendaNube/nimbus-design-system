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
