const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    "./index": "./src/index.ts",

    "./themes/base": "./src/themes/base.css.ts",
    "./themes/dark": "./src/themes/dark.css.ts",

    "./packages/badge/index": "./src/packages/badge/index",
    "./packages/checkbox/index": "./src/packages/checkbox/index",
    "./packages/chip/index": "./src/packages/chip/index",
    "./packages/icon/index": "./src/packages/icon/index",
    "./packages/iconButton/index": "./src/packages/iconButton/index",
    "./packages/label/index": "./src/packages/label/index",
    "./packages/skeleton/index": "./src/packages/skeleton/index",
    "./packages/spinner/index": "./src/packages/spinner/index",
    "./packages/tag/index": "./src/packages/tag/index",
    "./packages/text/index": "./src/packages/text/index",
    "./packages/title/index": "./src/packages/title/index",
    "./packages/toast/index": "./src/packages/toast/index",
    "./packages/toggle/index": "./src/packages/toggle/index",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "@nimbus-ds/styles",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new VanillaExtractPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  resolve: {
    alias: {
      "@nimbus-ds/tokens": path.resolve(__dirname, "../tokens"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: {
    "@nimbus-ds/tokens": "@nimbus-ds/tokens",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin()],
  },
};
