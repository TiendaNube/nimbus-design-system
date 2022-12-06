import {
  sprinkle,
  backgroundColorProperties,
  borderColorProperties,
  borderStyleProperties,
  boxSizingProperties,
  spaceProperties,
  cursorProperties,
} from "./box.sprinkle.css";

export const box = {
  sprinkle,
  properties: {
    backgroundColor: backgroundColorProperties,
    borderColor: borderColorProperties,
    borderStyle: borderStyleProperties,
    boxSizing: boxSizingProperties,
    space: spaceProperties,
    cursor: cursorProperties,
  },
};

export type { BoxSprinkle } from "./box.sprinkle.types";
