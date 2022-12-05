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
    library: "@nimbus-ds/alert",
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
      "@nimbus-ds/styles": path.resolve(__dirname, "../../../core/styles/dist"),
      "@nimbus-ds/title": path.resolve(__dirname, "../../atomic/Title/dist"),
      "@nimbus-ds/icon": path.resolve(__dirname, "../../atomic/Icon/dist"),
      "@nimbus-ds/skeleton": path.resolve(
        __dirname,
        "../../atomic/Skeleton/dist"
      ),
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
    "@nimbus-ds/styles": "@nimbus-ds/styles",
    react: "react",
    "react-dom": "react-dom",
  },
};
