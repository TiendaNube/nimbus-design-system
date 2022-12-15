import * as styles from "./text.style.css";
import { textSprinkle } from "./text.sprinkle.css";

export const text = {
  classnames: { ...styles },
  ...textSprinkle,
};
