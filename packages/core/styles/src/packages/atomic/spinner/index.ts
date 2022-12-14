import * as styles from "./spinner.style.css";
import { spinnerSprinkle } from "./spinner.sprinkle.css";

export const spinner = {
  classnames: { ...styles },
  ...spinnerSprinkle,
};
