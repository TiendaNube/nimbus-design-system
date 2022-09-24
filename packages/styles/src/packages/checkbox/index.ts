import * as styles from "./checkbox.style.css";
import {
  sprinkle,
  borderColorProperties,
  cursorProperties,
} from "./checkbox.sprinkle.css";

export const checkbox = {
  style: styles,
  sprinkle,
  properties: { color: borderColorProperties, cursor: cursorProperties },
};
