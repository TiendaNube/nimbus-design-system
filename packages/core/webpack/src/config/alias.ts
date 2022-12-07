/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 * @see https://webpack.js.org/configuration/dev-server/
 */
import { join } from "path";
import { rootDir } from "../utils/constants";

export const aliasItems = {
  "@nimbus-ds/tokens": join(rootDir, "../../core/tokens"),
  "@nimbus-ds/styles": join(rootDir, "../../core/styles/dist"),
  "@nimbus-ds/webpack": join(rootDir, "../../core/webpack/src"),
  "@nimbus-ds/skeleton": join(rootDir, "../../../react/atomic/Skeleton/src"),
};
