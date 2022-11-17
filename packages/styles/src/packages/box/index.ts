import * as style from "./box.style.css";
import {
  sprinkle,
  backgroundColorProperties,
  borderColorProperties,
  borderStyleProperties,
  spaceProperties,
  cursorProperties,
} from "./box.sprinkle.css";

export const box = {
  style,
  sprinkle,
  properties: {
    backgroundColor: backgroundColorProperties,
    borderColor: borderColorProperties,
    borderStyle: borderStyleProperties,
    space: spaceProperties,
    cursor: cursorProperties,
  },
};

export type { BoxSprinkle } from "./box.sprinkle.types";
