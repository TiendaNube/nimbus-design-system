import path from "node:path";
import { configuration } from "@nimbus-ds/webpack/src";

const config = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/breadcrumb",
  },
};

const getConfig = () => configuration.getConfiguration(config);

export default getConfig;
