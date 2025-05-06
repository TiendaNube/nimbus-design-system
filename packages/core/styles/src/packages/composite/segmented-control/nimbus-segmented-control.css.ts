import { style, styleVariants } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { varsThemeBase } from "../../../themes";
import { paddingProperties } from "../../../properties";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: varsThemeBase.colors.neutral.surface,
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
  transition: `all ${varsThemeBase.motion.speed.slow} ease`,
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
      outline: "none",
      ":hover": {
        borderColor: varsThemeBase.colors.neutral.interactiveHover,
      },
      ":active": {
        borderColor: varsThemeBase.colors.neutral.interactivePressed,
        background: varsThemeBase.colors.neutral.surfaceHighlight,
      },
      ":disabled": {
        background: varsThemeBase.colors.neutral.surface,
        color: varsThemeBase.colors.neutral.textDisabled,
        border: "none",
        cursor: "default",
      },
    },
  ],
  selected: [
    buttonBase,
    {
      background: varsThemeBase.colors.primary.surface,
      borderColor: varsThemeBase.colors.primary.interactive,
      color: varsThemeBase.colors.primary.interactive,
      // This is to ensure the selected button is on top of the other buttons
      zIndex: 1,
      ":hover": {
        background: varsThemeBase.colors.primary.surface,
        borderColor: varsThemeBase.colors.primary.interactiveHover,
        color: varsThemeBase.colors.primary.interactiveHover,
      },
      ":active": {
        background: varsThemeBase.colors.primary.surfaceHighlight,
        borderColor: varsThemeBase.colors.primary.interactivePressed,
        color: varsThemeBase.colors.primary.interactivePressed,
      },
    },
  ],
});

export const buttonStyles = {
  appearance: buttonAppearance,
};
