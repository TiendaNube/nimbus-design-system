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
} from "./plugins";
import { cssLoaderExtractRule, styleLoaderCssRule } from "./rules";

export const rules = { cssLoaderExtractRule, styleLoaderCssRule };
export const plugins = {
  vanillaExtractPlugin,
  miniCssExtractPlugin,
  dtsBundleGeneratorPlugin,
};
export const configuration = {
  externalLibs,
  development,
  production,
  base,
  getConfiguration,
};

const webpack = {
  rules,
  plugins,
  configuration,
};

export default webpack;
