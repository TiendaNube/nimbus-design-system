const path = require("path");

module.exports = {
  stories: [
    "../packages/react/**/*.stories.mdx",
    "../packages/react/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    {
      name: "storybook-addon-sass-postcss",
      options: {
        rule: {
          test: /\.(scss|sass)$/i,
        },
      },
    },
  ],
  framework: "@storybook/react",
  // we need to add aliases to webpack so it knows how to follow
  // to the source of the packages rather than the built version (dist)
  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...convertTsConfigPathsToWebpackAliases(),
      },
    },
  }),
};

const convertTsConfigPathsToWebpackAliases = () => {
  const rootDir = path.resolve(__dirname, "../");
  const tsconfig = require("../tsconfig.json");
  const tsconfigPaths = Object.entries(tsconfig.compilerOptions.paths);

  return tsconfigPaths.reduce((aliases, [realPath, mappedPath]) => {
    aliases[realPath] = path.join(rootDir, mappedPath[0]);
    return aliases;
  }, {});
};
