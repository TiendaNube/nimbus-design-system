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
    library: "@nimbus-ds/tabs",
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
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin()],
  },
  externals: {
    "@nimbus-ds/styles": "@nimbus-ds/styles",
    react: "react",
    "react-dom": "react-dom",
  },
};
