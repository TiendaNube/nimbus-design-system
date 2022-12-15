import * as styles from "./fileUploader.style.css";
import { fileUploaderSprinkle } from "./fileUploader.sprinkle.css";

export const fileUploader = {
  classnames: { ...styles },
  ...fileUploaderSprinkle,
};
