import { style, styleVariants } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { varsThemeBase } from "../../../themes";
import {
  textDecorationProperties,
  lineHeightProperties,
  fontSizeProperties,
} from "../../../properties";

/* -------------------------------------------------------------------------------------------------
 * Styles
 * -----------------------------------------------------------------------------------------------*/

const base = style({
  alignItems: "center",
  appearance: "none",
  display: "inline-flex",
  gap: varsThemeBase.spacing[1],
  textAlign: "inherit",
  fontWeight: varsThemeBase.fontWeight.regular,
  borderRadius: varsThemeBase.spacing[1],
  fontFamily: varsThemeBase.fontFamily.centranube,
  cursor: "pointer",
  boxSizing: "border-box",
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  backgroundColor: "transparent",
  border: 0,
  padding: 0,
  width: "fit-content",
  ":focus": {
    boxShadow: varsThemeBase.utils.focus,
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
    },
  ],
});

export const styles = {
  base,
  appearance,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkles
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
