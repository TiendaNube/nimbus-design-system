import { style } from "@vanilla-extract/css";
import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";

import {
  colorProperties,
  fontSizeProperties,
  fontWeightProperties,
  lineHeightProperties,
  textAlignProperties,
  wordBreakProperties,
} from "../../../properties";
import { mediaQueries, varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const base = style({
  fontFamily: varsThemeBase.fontFamily.sans,
  fontWeight: varsThemeBase.fontWeight.regular,
  margin: 0,
});

const trim = style({
  display: "-webkit-box",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitBoxOrient: "vertical",
});

export const styles = {
  base,
  trim,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const textColorProperties = {
  currentColor: "currentColor",

  "primary-surface": colorProperties["primary-surface"],
  "primary-interactive": colorProperties["primary-interactive"],
  "primary-textLow": colorProperties["primary-textLow"],
  "primary-textHigh": colorProperties["primary-textHigh"],

  "success-surface": colorProperties["success-surface"],
  "success-interactive": colorProperties["success-textLow"],
  "success-textLow": colorProperties["success-textLow"],
  "success-textHigh": colorProperties["success-textHigh"],

  "warning-surface": colorProperties["warning-surface"],
  "warning-interactive": colorProperties["warning-interactive"],
  "warning-textLow": colorProperties["warning-textLow"],
  "warning-textHigh": colorProperties["warning-textHigh"],

  "danger-surface": colorProperties["danger-surface"],
  "danger-interactive": colorProperties["danger-interactive"],
  "danger-textLow": colorProperties["danger-textLow"],
  "danger-textHigh": colorProperties["danger-textHigh"],

  "neutral-background": colorProperties["neutral-background"],
  "neutral-surface": colorProperties["neutral-surface"],
  "neutral-interactive": colorProperties["neutral-interactive"],
  "neutral-textDisabled": colorProperties["neutral-textDisabled"],
  "neutral-textLow": colorProperties["neutral-textLow"],
  "neutral-textHigh": colorProperties["neutral-textHigh"],
};

const properties = {
  color: textColorProperties,
  textAlign: textAlignProperties,
  lineHeight: lineHeightProperties,
  fontWeight: fontWeightProperties,
  fontSize: fontSizeProperties,
  wordBreak: wordBreakProperties,
};

const defineProperties = defineRainbowProperties({
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
  dynamicProperties: {
    lineClamp: true,
    WebkitLineClamp: true,
  },
  staticProperties: {
    ...properties,
  },
});

const sprinkle = createRainbowSprinkles(defineProperties);

export const textSprinkle = {
  sprinkle,
  properties,
};
