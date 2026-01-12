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
  textDecorationProperties,
  wordBreakProperties,
  textOverflowProperties,
  whiteSpaceProperties,
  overflowProperties,
} from "../../../properties";
import { mediaQueries, varsThemeBase } from "../../../themes";
import { gradients } from "../../../gradients";
import { createTextGradient } from "../../../gradients/gradientBuilder";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const base = style({
  fontFamily: varsThemeBase.fontFamily.sans,
  fontWeight: varsThemeBase.fontWeight.regular,
  margin: 0,
});

const aiGenerative = style({
  ...createTextGradient(gradients.aiGenerativeInteractive),
});

const trim = style({
  display: "-webkit-box",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitBoxOrient: "vertical",
});

const aiStyles = {
  "ai-generative": aiGenerative,
} as const;

export const styles = {
  base,
  trim,
  aiGenerative,
  aiStyles,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/
const aiColors = {
  "ai-generative": "transparent", // Special case for gradient handled in the styles
} as const;

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

  ...aiColors,
};

const properties = {
  color: textColorProperties,
  textAlign: textAlignProperties,
  lineHeight: lineHeightProperties,
  fontWeight: fontWeightProperties,
  fontSize: fontSizeProperties,
  wordBreak: wordBreakProperties,
  textDecoration: textDecorationProperties,
  textOverflow: textOverflowProperties,
  whiteSpace: whiteSpaceProperties,
  overflow: overflowProperties,
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
  aiColors,
  aiStyles,
};
