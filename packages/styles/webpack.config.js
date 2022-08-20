const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    "./index": "./src/index.ts",
    "./themes/dark": "./src/themes/dark.css.ts",
    "./themes/base": "./src/themes/base.css.ts",
    "./packages/title": "./src/packages/title.css.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "nimbus-ds",
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
};