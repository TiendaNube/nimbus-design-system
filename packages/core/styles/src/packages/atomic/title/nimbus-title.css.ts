import { style, styleVariants } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

import { mediaQueries, varsThemeBase } from "../../../themes";
import {
  colorProperties,
  titleFontSizeProperties,
  fontWeightProperties,
  titleLineHeightProperties,
  textAlignProperties,
  spacingProperties,
} from "../../../properties";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const base = style({
  fontFamily: varsThemeBase.fontFamily.sans,
  margin: 0,
});

export const appearance = styleVariants({
  h1: [
    base,
    {
      fontSize: varsThemeBase.fontSize.title.h1,
      lineHeight: varsThemeBase.lineWeight.title.h1,
      fontWeight: varsThemeBase.fontWeight.medium,
    },
  ],
  h2: [
    base,
    {
      fontSize: varsThemeBase.fontSize.title.h2,
      lineHeight: varsThemeBase.lineWeight.title.h2,
      fontWeight: varsThemeBase.fontWeight.medium,
    },
  ],
  h3: [
    base,
    {
      fontSize: varsThemeBase.fontSize.title.h3,
      lineHeight: varsThemeBase.lineWeight.title.h3,
      fontWeight: varsThemeBase.fontWeight.medium,
    },
  ],
  h4: [
    base,
    {
      fontSize: varsThemeBase.fontSize.title.h4,
      lineHeight: varsThemeBase.lineWeight.title.h4,
      fontWeight: varsThemeBase.fontWeight.medium,
    },
  ],
  h5: [
    base,
    {
      fontSize: varsThemeBase.fontSize.title.h5,
      lineHeight: varsThemeBase.lineWeight.title.h5,
      fontWeight: varsThemeBase.fontWeight.bold,
    },
  ],
  h6: [
    base,
    {
      fontSize: varsThemeBase.fontSize.title.h6,
      lineHeight: varsThemeBase.lineWeight.title.h6,
      fontWeight: varsThemeBase.fontWeight.bold,
    },
  ],
});

export const styles = {
  base,
  appearance,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const titleColorProperties = {
  "primary-textHigh": colorProperties["primary-textHigh"],
  "primary-textLow": colorProperties["primary-textLow"],
  "success-textHigh": colorProperties["success-textHigh"],
  "success-textLow": colorProperties["success-textLow"],
  "warning-textHigh": colorProperties["warning-textHigh"],
  "warning-textLow": colorProperties["warning-textLow"],
  "danger-textHigh": colorProperties["danger-textHigh"],
  "danger-textLow": colorProperties["danger-textLow"],
  "neutral-textHigh": colorProperties["neutral-textHigh"],
  "neutral-textLow": colorProperties["neutral-textLow"],
  "neutral-background": colorProperties["neutral-background"],
};

const fontSizeProperties = {
  ...titleFontSizeProperties,
  ...spacingProperties,
};

const lineHeightProperties = {
  ...titleLineHeightProperties,
  ...spacingProperties,
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
    conditions: {
      xs: {
        "@media": mediaQueries.xs(),
      },
      md: {
        "@media": mediaQueries.md(),
      },
      lg: {
        "@media": mediaQueries.lg(),
      },
      xl: {
        "@media": mediaQueries.xl(),
      },
    },
    defaultCondition: "xs",
    properties,
  })
);

export const titleSprinkle = {
  sprinkle,
  properties,
};
