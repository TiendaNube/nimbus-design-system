import * as styles from "./accordion.style.css";
import { accordionSprinkle } from "./accordion.sprinkle.css";

export const accordion = {
  classnames: { ...styles },
  ...accordionSprinkle,
};
