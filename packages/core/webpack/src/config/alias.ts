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
  const parts = curr.split("/");
  const componentName = parts[10];
  if (componentName) {
    const key = `@nimbus-ds/${dashify(componentName)}`;
    prev[key] = curr;
  }
  return prev;
}, {});

export const aliasItems = {
  "@nimbus-ds/icons": join(rootDir, "./packages/icons"),
  "@nimbus-ds/tokens": join(rootDir, "./packages/core/tokens"),
  "@nimbus-ds/typings": join(rootDir, "./packages/core/typings/src"),
  "@nimbus-ds/styles": join(rootDir, "./packages/core/styles/src"),
  "@nimbus-ds/webpack": join(rootDir, "./packages/core/webpack/src"),
  ...packages,
};
