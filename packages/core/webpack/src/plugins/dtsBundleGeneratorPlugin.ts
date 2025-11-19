/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */

import WebpackShellPluginNextPlugin from "webpack-shell-plugin-next";
import os from "os";
import { rootDir } from "../utils";

const entry = [
  `node ${rootDir}/node_modules/.bin/dts-bundle-generator -o ./dist/index.d.ts ./src/index.ts`,
];

export const dtsBundleGeneratorPlugin = (
  configuration: { entries: string[] } = { entries: entry }
) => {
  const config = {
    onBuildEnd: {
      scripts: [...configuration.entries],
      blocking: false,
      parallel: true,
      // Optimize memory usage and performance for parallel execution
      parallelOptions: {
        maxConcurrentProcesses: Math.min(
          8,
          Math.max(2, Math.ceil(os.cpus().length * 0.75))
        ),
      },
    },
  };

  return new WebpackShellPluginNextPlugin(config);
};
