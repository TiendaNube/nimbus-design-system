const path = require("path");
const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    "./index": "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "@nimbus-ds/file-uploader",
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
      "@nimbus-ds/styles": path.resolve(__dirname, "../../styles/dist"),
      "@nimbus-ds/icon": path.resolve(__dirname, "../Icon/src"),
      "@nimbus-ds/skeleton": path.resolve(__dirname, "../Skeleton/src"),
      "@nimbus-ds/text": path.resolve(__dirname, "../Text/src"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin()],
  },
  externals: {
    "@tiendanube/icons": "@tiendanube/icons",
    "@nimbus-ds/icon": "@nimbus-ds/icon",
    "@nimbus-ds/skeleton": "@nimbus-ds/skeleton",
    "@nimbus-ds/styles": "@nimbus-ds/styles",
    "@nimbus-ds/text": "@nimbus-ds/text",
    react: "react",
    "react-dom": "react-dom",
  },
};
