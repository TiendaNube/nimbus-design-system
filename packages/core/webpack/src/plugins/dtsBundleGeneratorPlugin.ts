/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */

import WebpackShellPluginNextPlugin from "webpack-shell-plugin-next";
import { rootDir } from "../utils";

const entry = [
  `node ${rootDir}/node_modules/.bin/dts-bundle-generator -o ./dist/index.d.ts ./src/index.ts`,
  `node ${rootDir}/node_modules/.bin/dts-bundle-generator -o ./dist/Text/index.d.ts ./src/atomic/Text/src/deep.ts`,
  `node ${rootDir}/node_modules/.bin/dts-bundle-generator -o ./dist/Box/index.d.ts ./src/atomic/Box/src/index.ts`,
  `node ${rootDir}/node_modules/.bin/dts-bundle-generator -o ./dist/Icon/index.d.ts ./src/atomic/Icon/src/index.ts`,
  `node ${rootDir}/node_modules/.bin/dts-bundle-generator -o ./dist/List/index.d.ts ./src/atomic/List/src/deep.ts`,
];

export const dtsBundleGeneratorPlugin = (
  configuration: { entries: string[] } = { entries: entry }
) => {
  const config = {
    onBuildEnd: {
      scripts: [...configuration.entries],
      blocking: false,
      parallel: true,
    },
  };

  return new WebpackShellPluginNextPlugin(config);
};
