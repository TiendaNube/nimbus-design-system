import path from "path";
import glob from "glob";

import { plugins, rules, configuration } from "@nimbus-ds/webpack/src";

const paths = glob.sync(
  `${path.resolve(__dirname, "src/packages/")}/*/*/index.ts`
);

const entries = paths.reduce((prev: { [key: string]: string }, curr) => {
  const key = curr
    .replace(`${path.resolve(__dirname)}/src/`, "./")
    .replace(/(.ts|.css.ts)/, "");

  prev[key] = curr.replace(path.resolve(__dirname), ".");
  return prev;
}, {});

const config = {
  entry: {
    "./themes/base": "./src/themes/base.css.ts",
    "./themes/dark": "./src/themes/dark.css.ts",
    ...entries,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/styles",
  },
  module: { rules: [rules.cssLoaderExtractRule] },
  plugins: [plugins.vanillaExtractPlugin, plugins.miniCssExtractPlugin],
};

export default () => configuration.getConfiguration(config);
