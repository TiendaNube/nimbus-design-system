import path from "path";
import { rules, configuration } from "@nimbus-ds/webpack/src";

const config = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/button",
  },
  module: { rules: [rules.styleLoaderCssRule] },
};

export default () => configuration.getConfiguration(config);
