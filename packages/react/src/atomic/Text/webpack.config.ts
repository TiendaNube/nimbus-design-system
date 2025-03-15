import path from "path";
import { configuration } from "@nimbus-ds/webpack/src";

const baseConfig = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/text",
  },
};

const config = configuration.getConfiguration(baseConfig);

// Exclude external dependencies from the bundles, as this is an isolated component.
// Check if there's a specific dependency that should be included in the bundle.
delete config.externals;

export default () => config;
