import { getConfiguration, development, production, base } from "./config";
import { vanillaExtractPlugin, miniCssExtractPlugin } from "./plugins";
import { cssLoaderExtractRule, styleLoaderCssRule } from "./rules";

export const plugins = { vanillaExtractPlugin, miniCssExtractPlugin };
export const rules = { cssLoaderExtractRule, styleLoaderCssRule };
export const configuration = {
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
