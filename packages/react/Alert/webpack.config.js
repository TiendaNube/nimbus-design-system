const path = require("path");
const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    "./index": "./src/index.ts",
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
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new VanillaExtractPlugin()],
  resolve: {
    alias: {
      "@nimbus-ds/skeleton": path.resolve(__dirname, "../Skeleton/src"),
      "@nimbus-ds/styles": path.resolve(__dirname, "../../styles/dist"),
      "@nimbus-ds/title": path.resolve(__dirname, "../Title/src"),
      "@nimbus-ds/icon": path.resolve(__dirname, "../Icon/src"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin()],
  },
  externals: {
    "@nimbus-ds/text": "@nimbus-ds/text",
    "@nimbus-ds/skeleton": "@nimbus-ds/skeleton",
    "@nimbus-ds/title": "@nimbus-ds/title",
    "@nimbus-ds/icon": "@nimbus-ds/icon",
    react: "react",
    "react-dom": "react-dom",
  },
};
