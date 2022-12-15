import * as styles from "./link.style.css";
import { linkSprinkle } from "./link.sprinkle.css";

export const link = {
  classnames: { ...styles },
  ...linkSprinkle,
};
