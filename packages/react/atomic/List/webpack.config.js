const path = require("path");
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
    library: "@nimbus-ds/list",
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
      "@nimbus-ds/styles": path.resolve(__dirname, "../../../core/styles/dist"),
      "@nimbus-ds/skeleton": path.resolve(__dirname, "../Skeleton/src"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin()],
  },
  externals: {
    "@nimbus-ds/skeleton": "@nimbus-ds/skeleton",
    "@nimbus-ds/styles": "@nimbus-ds/styles",
    react: "react",
    "react-dom": "react-dom",
  },
};
