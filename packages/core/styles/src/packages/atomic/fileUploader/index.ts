import * as styles from "./fileUploader.style.css";
import {
  sprinkle,
  aspectRatioProperties,
  flexDirectionProperties,
} from "./fileUploader.sprinkle.css";

export const fileUploader = {
  style: { ...styles },
  sprinkle,
  properties: {
    aspectRatio: aspectRatioProperties,
    flexDirection: flexDirectionProperties,
  },
};
