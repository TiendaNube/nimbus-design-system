import * as styles from "./thumbnail.style.css";
import { thumbnailSprinkle } from "./thumbnail.sprinkle.css";

export const thumbnail = {
  classnames: { ...styles },
  ...thumbnailSprinkle,
};
