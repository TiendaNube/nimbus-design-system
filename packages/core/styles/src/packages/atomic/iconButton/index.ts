import * as style from "./iconButton.style.css";
import {
  backgroundColorProperties,
  borderColorProperties,
  sprinkle,
} from "./iconButton.sprinkle.css";

export const iconButton = {
  style,
  sprinkle,
  properties: {
    backgroundColor: backgroundColorProperties,
    borderColor: borderColorProperties,
  },
};

export type { IconButtonSprinkle } from "./iconButton.sprinkle.types";
