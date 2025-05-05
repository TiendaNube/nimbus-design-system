import { style, styleVariants } from "@vanilla-extract/css";
import { defineProperties , createSprinkles } from "@vanilla-extract/sprinkles";
import { varsThemeBase } from "../../../themes";
import { paddingProperties } from "../../../properties";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: varsThemeBase.spacing[1],
});

export const styles = {
  container,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const containerProperties = {
  padding: paddingProperties,
};

export const containerSprinkle = {
  sprinkle: createSprinkles(
    defineProperties({
      properties: containerProperties,
    })
  ),
  properties: containerProperties,
};

const buttonBase = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "2rem",
  width: "fit-content",
  textDecoration: "none",
  cursor: "pointer",
  boxSizing: "border-box",
  padding: `${varsThemeBase.spacing[2]} ${varsThemeBase.spacing[4]}`,
  gap: varsThemeBase.spacing[1],
  fontWeight: varsThemeBase.fontWeight.medium,
  lineHeight: varsThemeBase.lineWeight.body.base,
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.sans,
  color: varsThemeBase.colors.neutral.textHigh,
  borderRadius: varsThemeBase.shape.border.radius[2],
  borderStyle: "solid",
  borderWidth: varsThemeBase.shape.border.width[1],
  borderColor: "transparent",
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  ":disabled": {
    color: varsThemeBase.colors.neutral.textDisabled,
    cursor: "not-allowed",
  },
  ":focus": {
    boxShadow: varsThemeBase.utils.focus,
  },
});

const buttonAppearance = styleVariants({
  default: [
    buttonBase,
    {
      background: varsThemeBase.colors.neutral.surface,
      color: varsThemeBase.colors.neutral.textHigh,
      ":hover": {
        borderColor: varsThemeBase.colors.neutral.interactiveHover,
      },
      ":active": {
        borderColor: varsThemeBase.colors.neutral.interactivePressed,
      },
      ":disabled": {
        color: varsThemeBase.colors.neutral.textDisabled,
        background: varsThemeBase.colors.neutral.surface,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactivePressed,
      },
    },
  ],
  selected: [
    buttonBase,
    {
      background: varsThemeBase.colors.primary.surface,
      color: varsThemeBase.colors.primary.interactive,
      ":hover": {
        background: varsThemeBase.colors.primary.surface,
        borderColor: varsThemeBase.colors.primary.interactiveHover,
        color: varsThemeBase.colors.primary.textLow,
      },
      ":active": {
        background: varsThemeBase.colors.primary.surface,
        borderColor: varsThemeBase.colors.primary.interactivePressed,
      },
      ":disabled": {
        background: varsThemeBase.colors.neutral.surface,
        color: varsThemeBase.colors.neutral.textDisabled,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactiveHover,
      },
    },
  ],
});

export const buttonStyles = {
  appearance: buttonAppearance,
};
