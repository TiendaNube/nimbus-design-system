import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

import {
  colorProperties,
  titleFontSizeProperties,
  fontWeightProperties,
  titleLineHeightProperties,
  textAlignProperties,
  sizeProperties,
} from "../../../properties";

const titleColorProperties = {
  "primary.textHigh": colorProperties["primary.textHigh"],
  "primary.textLow": colorProperties["primary.textLow"],
  "success.textHigh": colorProperties["success.textHigh"],
  "success.textLow": colorProperties["success.textLow"],
  "warning.textHigh": colorProperties["warning.textHigh"],
  "warning.textLow": colorProperties["warning.textLow"],
  "danger.textHigh": colorProperties["danger.textHigh"],
  "danger.textLow": colorProperties["danger.textLow"],
  "neutral.textHigh": colorProperties["neutral.textHigh"],
  "neutral.textLow": colorProperties["neutral.textLow"],
};

const fontSizeProperties = {
  ...titleFontSizeProperties,
  ...sizeProperties,
};

const lineHeightProperties = {
  ...titleLineHeightProperties,
  ...sizeProperties,
};

const properties = {
  color: titleColorProperties,
  textAlign: textAlignProperties,
  fontSize: fontSizeProperties,
  fontWeight: fontWeightProperties,
  lineHeight: lineHeightProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const titleSprinkle = {
  sprinkle,
  properties,
};
