import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

import { varsThemeBase } from "../../themes/base.css";
import { properties as colors } from "../../sprinkles/colors.css";
import { properties as textAlignProperties } from "../../sprinkles/textAlign.css";

const colorsProperties = {
  "primary.background": colors["primary.background"],
  "primary.interactive": colors["primary.interactive"],
  "primary.textLow": colors["primary.textLow"],
  "primary.textHigh": colors["primary.textHigh"],

  "success.background": colors["success.background"],
  "success.interactive": colors["success.interactive"],
  "success.textLow": colors["success.textLow"],
  "success.textHigh": colors["success.textHigh"],

  "warning.background": colors["warning.background"],
  "warning.interactive": colors["warning.interactive"],
  "warning.textLow": colors["warning.textLow"],
  "warning.textHigh": colors["warning.textHigh"],

  "danger.background": colors["danger.background"],
  "danger.interactive": colors["danger.interactive"],
  "danger.textLow": colors["danger.textLow"],
  "danger.textHigh": colors["danger.textHigh"],

  "neutral.background": colors["neutral.background"],
  "neutral.interactive": colors["neutral.interactive"],
  "neutral.textDisabled": colors["neutral.textDisabled"],
  "neutral.textLow": colors["neutral.textLow"],
  "neutral.textHigh": colors["neutral.textHigh"],
};

const lineHeightProperties = {
  small: varsThemeBase.lineWeight.body.small,
  caption: varsThemeBase.lineWeight.body.caption,
  base: varsThemeBase.lineWeight.body.base,
};

const fontWeightProperties = {
  regular: varsThemeBase.fontWeight.regular,
  bold: varsThemeBase.fontWeight.bold,
};

const fontSizeProperties = {
  small: varsThemeBase.fontSize.body.small,
  caption: varsThemeBase.fontSize.body.caption,
  base: varsThemeBase.fontSize.body.base,
};

export const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      color: colorsProperties,
      lineHeight: lineHeightProperties,
      fontWeight: fontWeightProperties,
      fontSize: fontSizeProperties,
      textAlign: textAlignProperties,
    },
  })
);

export {
  textAlignProperties,
  colorsProperties,
  lineHeightProperties,
  fontWeightProperties,
  fontSizeProperties,
};
