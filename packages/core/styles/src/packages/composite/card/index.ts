import * as styles from "./card.style.css";
import {
  sprinkle,
  paddingProperties,
  backgroundColorProperties,
} from "./card.sprinkle.css";

export const card = {
  style: { ...styles },
  sprinkle,
  properties: {
    padding: paddingProperties,
    backgroundColor: backgroundColorProperties,
  },
};
