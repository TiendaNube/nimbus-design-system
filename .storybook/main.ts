import { dirname, join } from "path";
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
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("storybook-dark-mode"),
    getAbsolutePath("@storybook/addon-mdx-gfm"),
    getAbsolutePath("@storybook/addon-webpack5-compiler-babel"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
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

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
