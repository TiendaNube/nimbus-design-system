import path from "path";
import { configuration } from "@nimbus-ds/webpack/src";

const config = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/typings",
  },
};

export default () =>
  configuration.getConfiguration(config, { isClientSide: true });
