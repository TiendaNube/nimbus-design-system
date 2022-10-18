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
    library: "@nimbus-ds/textarea",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      "@nimbus-ds/skeleton": path.resolve(__dirname, "../Skeleton/src"),
      "@nimbus-ds/styles": path.resolve(__dirname, "../../styles/dist"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin()],
  },
  externals: {
    "@nimbus-ds/styles": "@nimbus-ds/styles",
    "@nimbus-ds/skeleton": "@nimbus-ds/skeleton",
    react: "react",
    "react-dom": "react-dom",
  },
};
