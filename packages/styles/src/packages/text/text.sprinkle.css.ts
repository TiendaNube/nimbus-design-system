import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { varsThemeBase } from "../../themes/base.css";
import * as base from "../../sprinkles/colors.css";

import { properties as textAlignProperties } from "../../sprinkles/textAlign.css";

const colorsProperties = {
  "primary.background": base.properties["primary.background"],
  "primary.interactive": base.properties["primary.interactive"],
  "primary.textLow": base.properties["primary.textLow"],
  "primary.textHigh": base.properties["primary.textHigh"],

  "success.background": base.properties["success.background"],
  "success.interactive": base.properties["success.interactive"],
  "success.textLow": base.properties["success.textLow"],
  "success.textHigh": base.properties["success.textHigh"],

  "warning.background": base.properties["warning.background"],
  "warning.interactive": base.properties["warning.interactive"],
  "warning.textLow": base.properties["warning.textLow"],
  "warning.textHigh": base.properties["warning.textHigh"],

  "danger.background": base.properties["danger.background"],
  "danger.interactive": base.properties["danger.interactive"],
  "danger.textLow": base.properties["danger.textLow"],
  "danger.textHigh": base.properties["danger.textHigh"],

  "neutral.background": base.properties["neutral.background"],
  "neutral.interactive": base.properties["neutral.interactive"],
  "neutral.textLow": base.properties["neutral.textLow"],
  "neutral.textHigh": base.properties["neutral.textHigh"],
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
