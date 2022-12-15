/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */

import WebpackShellPluginNextPlugin from "webpack-shell-plugin-next";
import { rootDir } from "../utils";

const config = {
  onBuildEnd: {
    scripts: [
      `node ${rootDir}/node_modules/.bin/dts-bundle-generator -o ./dist/index.d.ts ./src/index.ts`,
    ],
    blocking: false,
    parallel: true,
  },
};

export const dtsBundleGeneratorPlugin = new WebpackShellPluginNextPlugin(
  config
);
