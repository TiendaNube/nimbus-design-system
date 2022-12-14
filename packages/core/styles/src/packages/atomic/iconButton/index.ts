import * as style from "./iconButton.style.css";
import {
  iconButtonBackgroundColorProperties,
  iconButtonBorderColorProperties,
  sprinkle,
} from "./iconButton.sprinkle.css";

export const iconButton = {
  style,
  sprinkle,
  properties: {
    backgroundColor: iconButtonBackgroundColorProperties,
    borderColor: iconButtonBorderColorProperties,
  },
};

export type { IconButtonSprinkle } from "./iconButton.sprinkle.types";
