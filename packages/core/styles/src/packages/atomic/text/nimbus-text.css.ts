import { style } from "@vanilla-extract/css";
import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";

import {
  fontSizeProperties,
  fontWeightProperties,
  lineHeightProperties,
  textAlignProperties,
  textDecorationProperties,
  typographyAiColors,
  typographyColorProperties,
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
const aiColors = typographyAiColors;

const textColorProperties = {
  ...typographyColorProperties,
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
