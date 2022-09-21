const path = require("path");
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
    library: "@nimbus-ds/chip",
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
    "@nimbus-ds/icon": "@nimbus-ds/icon",
    "@nimbus-ds/skeleton": "@nimbus-ds/skeleton",
    "@nimbus-ds/styles": "@nimbus-ds/styles",
    "@nimbus-ds/text": "@nimbus-ds/text",
    "@tiendanube/icons": "@tiendanube/icons",
    react: "react",
    "react-dom": "react-dom",
  },
};
