/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 * @see https://webpack.js.org/configuration/dev-server/
 */
import { join } from "path";
import { rootDir } from "../utils/constants";

export const aliasItems = {
  "@nimbus-ds/tokens": join(rootDir, "./packages/core/tokens"),
  "@nimbus-ds/styles": join(rootDir, "./packages/core/styles/dist"),
  "@nimbus-ds/webpack": join(rootDir, "./packages/core/webpack/src"),
  "@nimbus-ds/icon": join(rootDir, "./packages/react/atomic/Icon/src"),
  "@nimbus-ds/skeleton": join(rootDir, "./packages/react/atomic/Skeleton/src"),
  "@nimbus-ds/spinner": join(rootDir, "./packages/react/atomic/Spinner/src"),
  "@nimbus-ds/text": join(rootDir, "./packages/react/atomic/Text/src"),
};
