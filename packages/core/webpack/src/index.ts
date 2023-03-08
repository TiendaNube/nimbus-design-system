import {
  getConfiguration,
  development,
  production,
  base,
  externalLibs,
} from "./config";
import {
  vanillaExtractPlugin,
  miniCssExtractPlugin,
  dtsBundleGeneratorPlugin,
  cssHashRemoverPlugin,
} from "./plugins";
import { cssLoaderExtractRule, styleLoaderCssRule } from "./rules";
import { rootDir } from "./utils";

export const rules = { cssLoaderExtractRule, styleLoaderCssRule };
export const plugins = {
  vanillaExtractPlugin,
  miniCssExtractPlugin,
  dtsBundleGeneratorPlugin,
  cssHashRemoverPlugin,
};
export const configuration = {
  externalLibs,
  development,
  production,
  base,
  getConfiguration,
};

export const utils = { rootDir };

const webpack = {
  rules,
  plugins,
  configuration,
  utils,
};

export default webpack;
