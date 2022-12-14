import * as styles from "./iconButton.style.css";
import { iconButtonSprinkle } from "./iconButton.sprinkle.css";

export const iconButton = {
  classnames: { ...styles },
  ...iconButtonSprinkle,
};

export type { IconButtonSprinkle } from "./iconButton.sprinkle.types";
