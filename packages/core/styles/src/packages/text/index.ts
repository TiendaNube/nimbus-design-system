import { style } from "./text.style.css";
import {
  sprinkle,
  colorsProperties,
  textAlignProperties,
  lineHeightProperties,
  fontWeightProperties,
  fontSizeProperties,
} from "./text.sprinkle.css";

export const text = {
  style,
  sprinkle,
  properties: {
    colors: colorsProperties,
    textAlign: textAlignProperties,
    lineHeight: lineHeightProperties,
    fontWeight: fontWeightProperties,
    fontSize: fontSizeProperties,
  },
};
