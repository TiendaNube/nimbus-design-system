/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 * @see https://webpack.js.org/configuration/dev-server/
 */
import dashify from "dashify";
import glob from "glob";
import { join } from "path";
import { rootDir } from "../utils/constants";

const paths = glob.sync(`${join(rootDir, "./packages/react/src/*/*/src")}`);

const packages = paths.reduce((prev: { [key: string]: string }, curr) => {
  const key = `@nimbus-ds/${dashify(curr.split("/")[10])}`;
  prev[key] = curr;
  return prev;
}, {});

export const aliasItems = {
  "@nimbus-ds/tokens": join(rootDir, "./packages/core/tokens"),
  "@nimbus-ds/styles": join(rootDir, "./packages/core/styles/src"),
  "@nimbus-ds/webpack": join(rootDir, "./packages/core/webpack/src"),
  ...packages,
};
