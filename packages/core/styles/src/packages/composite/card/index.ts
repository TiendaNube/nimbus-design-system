import * as styles from "./card.style.css";
import { cardSprinkle } from "./card.sprinkle.css";

export const card = {
  classnames: { ...styles },
  ...cardSprinkle,
};
