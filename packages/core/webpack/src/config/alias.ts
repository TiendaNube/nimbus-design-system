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
  "@nimbus-ds/checkbox": join(
    rootDir,
    "./packages/react/src/atomic/Checkbox/src"
  ),
  "@nimbus-ds/file-uploader": join(
    rootDir,
    "./packages/react/src/atomic/FileUploader/src"
  ),
  "@nimbus-ds/icon": join(rootDir, "./packages/react/src/atomic/Icon/src"),
  "@nimbus-ds/icon-button": join(
    rootDir,
    "./packages/react/src/atomic/IconButton/src"
  ),
  "@nimbus-ds/label": join(rootDir, "./packages/react/src/atomic/Label/src"),
  "@nimbus-ds/link": join(rootDir, "./packages/react/src/atomic/Link/src"),
  "@nimbus-ds/radio": join(rootDir, "./packages/react/src/atomic/Radio/src"),
  "@nimbus-ds/skeleton": join(
    rootDir,
    "./packages/react/src/atomic/Skeleton/src"
  ),
  "@nimbus-ds/spinner": join(
    rootDir,
    "./packages/react/src/atomic/Spinner/src"
  ),
  "@nimbus-ds/tag": join(rootDir, "./packages/react/src/atomic/Tag/src"),
  "@nimbus-ds/text": join(rootDir, "./packages/react/src/atomic/Text/src"),
  "@nimbus-ds/textarea": join(
    rootDir,
    "./packages/react/src/atomic/Textarea/src"
  ),
  "@nimbus-ds/thumbnail": join(
    rootDir,
    "./packages/react/src/atomic/Thumbnail/src"
  ),
  "@nimbus-ds/tooltip": join(
    rootDir,
    "./packages/react/src/atomic/Tooltip/src"
  ),
  "@nimbus-ds/toggle": join(rootDir, "./packages/react/src/atomic/Toggle/src"),
  "@nimbus-ds/alert": join(rootDir, "./packages/react/src/composite/Alert/src"),
  "@nimbus-ds/card": join(rootDir, "./packages/react/src/composite/Card/src"),
};
