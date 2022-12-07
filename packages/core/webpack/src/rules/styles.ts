/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */

import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const miniCssExtractRule = {
  test: /\.css$/,
  loader: MiniCssExtractPlugin.loader,
};

export const cssLoaderExtractRule = {
  test: /\.css$/i,
  use: [MiniCssExtractPlugin.loader, "css-loader"],
};

export const styleLoaderCssRule = {
  test: /\.css$/i,
  use: ["style-loader", "css-loader"],
};
