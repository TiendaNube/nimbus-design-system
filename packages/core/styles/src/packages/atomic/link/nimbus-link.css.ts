import { style, styleVariants } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { varsThemeBase } from "../../../themes";
import {
  textDecorationProperties,
  lineHeightProperties,
  fontSizeProperties,
} from "../../../properties";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const base = style({
  alignItems: "center",
  appearance: "none",
  display: "inline-flex",
  textAlign: "inherit",
  cursor: "pointer",
  boxSizing: "border-box",
  gap: varsThemeBase.spacing[1],
  fontWeight: varsThemeBase.fontWeight.regular,
  borderRadius: varsThemeBase.shape.border.radius[1],
  fontFamily: varsThemeBase.fontFamily.sans,
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  backgroundColor: "transparent",
  border: 0,
  padding: 0,
  width: "fit-content",
  ":focus-visible": {
    boxShadow: varsThemeBase.utils.focus,
    outline: "none",
  },
  ":disabled": {
    opacity: 0.5,
    cursor: "inherit",
  },
});

export const appearance = styleVariants({
  primary: [
    base,
    {
      color: varsThemeBase.colors.primary.interactive,
      ":hover": {
        color: varsThemeBase.colors.primary.interactiveHover,
      },
      ":active": {
        color: varsThemeBase.colors.primary.interactivePressed,
      },
      ":disabled": {
        color: varsThemeBase.colors.neutral.textDisabled,
      },
    },
  ],
  danger: [
    base,
    {
      color: varsThemeBase.colors.danger.interactive,
      ":hover": {
        color: varsThemeBase.colors.danger.interactiveHover,
      },
      ":active": {
        color: varsThemeBase.colors.danger.interactivePressed,
      },
      ":disabled": {
        color: varsThemeBase.colors.neutral.textDisabled,
      },
    },
  ],
  neutral: [
    base,
    {
      color: varsThemeBase.colors.neutral.textLow,
      ":hover": {
        color: varsThemeBase.colors.neutral.textDisabled,
      },
      ":active": {
        color: varsThemeBase.colors.neutral.textHigh,
      },
      ":disabled": {
        color: varsThemeBase.colors.neutral.textDisabled,
      },
    },
  ],
  "neutral-background": [
    base,
    {
      color: varsThemeBase.colors.neutral.background,
      ":hover": {
        color: varsThemeBase.colors.neutral.surface,
      },
      ":active": {
        color: varsThemeBase.colors.neutral.surfaceDisabled,
      },
      ":disabled": {
        color: varsThemeBase.colors.neutral.textDisabled,
      },
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

const properties = {
  textDecoration: textDecorationProperties,
  fontSize: fontSizeProperties,
  lineHeight: lineHeightProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const linkSprinkle = {
  sprinkle,
  properties,
};
