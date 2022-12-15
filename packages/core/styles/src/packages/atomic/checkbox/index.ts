import * as styles from "./checkbox.style.css";
import { checkboxSprinkle } from "./checkbox.sprinkle.css";

export const checkbox = {
  classnames: { ...styles },
  ...checkboxSprinkle,
};
