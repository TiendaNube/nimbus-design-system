const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = async ({ config }) => {
  // fonts
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./fonts"),
          to: "fonts",
        },
      ],
    })
  );
  return config;
};
