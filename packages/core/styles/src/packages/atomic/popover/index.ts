import * as styles from "./popover.style.css";
import { popoverSprinkle } from "./popover.sprinkle.css";

export const popover = {
  classnames: { ...styles },
  ...popoverSprinkle,
};
