import * as styles from "./title.style.css";
import { titleSprinkle } from "./title.sprinkle.css";

export const title = {
  classnames: { ...styles },
  ...titleSprinkle,
};
