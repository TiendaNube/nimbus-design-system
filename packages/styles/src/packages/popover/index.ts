import * as style from "./popover.style.css";
import {
  backgroundColorProperties,
  paddingProperties,
  colorProperties,
  sprinkle,
} from "./popover.sprinkle.css";

export const popover = {
  style,
  sprinkle,
  properties: {
    backgroundColor: backgroundColorProperties,
    padding: paddingProperties,
    color: colorProperties,
  },
};
