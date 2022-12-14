import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

import {
  colorProperties,
  fontSizeProperties,
  fontWeightProperties,
  lineHeightProperties,
  textAlignProperties,
} from "../../../properties";

const textColorProperties = {
  currentColor: "currentColor",

  "primary.interactive": colorProperties["primary.interactive"],
  "primary.textLow": colorProperties["primary.textLow"],
  "primary.textHigh": colorProperties["primary.textHigh"],

  "success.interactive": colorProperties["success.interactive"],
  "success.textLow": colorProperties["success.textLow"],
  "success.textHigh": colorProperties["success.textHigh"],

  "warning.interactive": colorProperties["warning.interactive"],
  "warning.textLow": colorProperties["warning.textLow"],
  "warning.textHigh": colorProperties["warning.textHigh"],

  "danger.interactive": colorProperties["danger.interactive"],
  "danger.textLow": colorProperties["danger.textLow"],
  "danger.textHigh": colorProperties["danger.textHigh"],

  "neutral.background": colorProperties["neutral.background"],
  "neutral.interactive": colorProperties["neutral.interactive"],
  "neutral.textDisabled": colorProperties["neutral.textDisabled"],
  "neutral.textLow": colorProperties["neutral.textLow"],
  "neutral.textHigh": colorProperties["neutral.textHigh"],
};

const properties = {
  color: textColorProperties,
  textAlign: textAlignProperties,
  lineHeight: lineHeightProperties,
  fontWeight: fontWeightProperties,
  fontSize: fontSizeProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const textSprinkle = {
  sprinkle,
  properties,
};
