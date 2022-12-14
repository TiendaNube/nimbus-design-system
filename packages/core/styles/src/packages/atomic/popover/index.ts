import * as styles from "./popover.style.css";
import {
  backgroundColorProperties,
  paddingProperties,
  colorProperties,
  sprinkle,
} from "./popover.sprinkle.css";

export const popover = {
  style: { ...styles },
  sprinkle,
  properties: {
    backgroundColor: backgroundColorProperties,
    padding: paddingProperties,
    color: colorProperties,
  },
};
