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
  UseClientInjectionPlugin,
  MoveFilesIntoDistFolderPlugin,
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
  getComponentsPackageExports,
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
  MoveFilesIntoDistFolderPlugin,
};
export const configuration = {
  aliasItems,
  externalLibs,
  development,
  production,
  base,
  getConfiguration,
};

export const utils = {
  rootDir,
  arrayFilterEmpty,
  isProduction,
  isDevelopment,
  getComponentsPackageExports,
};

const webpack = {
  rules,
  plugins,
  configuration,
  utils,
};

export default webpack;
