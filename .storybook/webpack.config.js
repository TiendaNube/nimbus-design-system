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
  // svgs
  config.module.rules = [
    ...config.module.rules.map((rule) => {
      if (/svg/.test(rule.test)) {
        // Silence the Storybook loaders for SVG files
        return { ...rule, exclude: /\.svg$/i };
      }

      return rule;
    }),
    // Add your custom SVG loader
    {
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    },
  ];

  return config;
};
