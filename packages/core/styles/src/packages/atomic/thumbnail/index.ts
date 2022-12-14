import * as styles from "./thumbnail.style.css";
import { sprinkle, aspectRatioProperties } from "./thumbnail.sprinkle.css";

export const thumbnail = {
  style: { ...styles },
  sprinkle,
  properties: { aspectRatio: aspectRatioProperties },
};
