import * as style from "./card.style.css";
import {
  sprinkle,
  paddingProperties,
  backgroundColorProperties,
} from "./card.sprinkle.css";

export const card = {
  style,
  sprinkle,
  properties: {
    padding: paddingProperties,
    backgroundColor: backgroundColorProperties,
  },
};