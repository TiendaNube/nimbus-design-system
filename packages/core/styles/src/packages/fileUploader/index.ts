import * as style from "./fileUploader.style.css";
import {
  sprinkle,
  aspectRatioProperties,
  flexDirectionProperties,
} from "./fileUploader.sprinkle.css";

export const fileUploader = {
  style,
  sprinkle,
  properties: {
    aspectRatio: aspectRatioProperties,
    flexDirection: flexDirectionProperties,
  },
};
