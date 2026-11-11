/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */

import { exec } from "child_process"; // NOSONAR
import os from "os"; // NOSONAR
import { type Compiler, type WebpackPluginInstance } from "webpack";
import { rootDir } from "../utils";

const entry = [
  `node ${rootDir}/node_modules/.bin/dts-bundle-generator --no-check -o ./dist/index.d.ts ./src/index.ts`,
];

const runShellCommand = (command: string): Promise<void> =>
  new Promise((resolve, reject) => {
    exec(command, { maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (stdout) {
        process.stdout.write(stdout);
      }
      if (stderr) {
        process.stderr.write(stderr);
      }
      if (error) {
        reject(
          new Error(
            `dts-bundle-generator command failed (exit code ${
              error.code ?? 1
            }): ${command}\n${stderr || error.message}`
          )
        );
        return;
      }
      resolve();
    });
  });

const runWithConcurrency = async (
  commands: string[],
  concurrency: number
): Promise<void> => {
  const queue = [...commands];
  const workers = Array.from(
    { length: Math.min(concurrency, queue.length) },
    async () => {
      while (queue.length > 0) {
        const nextCmd = queue.shift();
        if (nextCmd) {
          // eslint-disable-next-line no-await-in-loop
          await runShellCommand(nextCmd);
        }
      }
    }
  );
  await Promise.all(workers);
};

export const dtsBundleGeneratorPlugin = (
  configuration: { entries: string[] } = { entries: entry }
): WebpackPluginInstance => {
  const commands = [...configuration.entries];
  const maxConcurrency = Math.max(1, Math.min(4, os.cpus().length));

  return {
    apply(compiler: Compiler) {
      compiler.hooks.afterEmit.tapPromise(
        "DtsBundleGeneratorPlugin",
        async () => {
          if (process.env.NIMBUS_SKIP_DTS === "true" || !commands.length) {
            return;
          }
          await runWithConcurrency(commands, maxConcurrency);
        }
      );
    },
  };
};
