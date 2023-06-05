import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { StorybookConfig } from "@storybook/react-webpack5";
import { VanillaExtractPlugin } from "@vanilla-extract/webpack-plugin";
import { convertTsConfigPathsToWebpackAliases } from "./utils";

const config: StorybookConfig = {
  stories: ["../packages/react/*/**/*.stories.@(js|jsx|ts|tsx)"],
  refs: {
    patterns: {
      title: "@nimbus-ds/patterns",
      url: "https://tiendanube.github.io/nimbus-patterns",
    },
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
    "@storybook/addon-mdx-gfm",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: [
    {
      from: "./static",
      to: "/static",
    },
  ],
  docs: {
    autodocs: "tag",
  },
  webpackFinal(config) {
    config.plugins?.push(
      new VanillaExtractPlugin() as any,
      new MiniCssExtractPlugin() as any
    );
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        ...convertTsConfigPathsToWebpackAliases(),
      },
    };

    config.module?.rules
      ?.filter((rule: any) => rule && rule.test?.test(".svg"))
      ?.forEach((rule: any) => (rule.exclude = /\.svg$/i));

    config.module?.rules?.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
export default config;
