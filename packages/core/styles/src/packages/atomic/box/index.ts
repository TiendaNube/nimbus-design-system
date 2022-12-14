import {
  sprinkle,
  boxBackgroundColorProperties,
  boxBorderColorProperties,
  boxBorderStyleProperties,
  boxBoxSizingProperties,
  boxSpaceProperties,
  boxCursorProperties,
} from "./box.sprinkle.css";

export const box = {
  sprinkle,
  properties: {
    backgroundColor: boxBackgroundColorProperties,
    borderColor: boxBorderColorProperties,
    borderStyle: boxBorderStyleProperties,
    boxSizing: boxBoxSizingProperties,
    space: boxSpaceProperties,
    cursor: boxCursorProperties,
  },
};

export type { BoxSprinkle } from "./box.sprinkle.types";
