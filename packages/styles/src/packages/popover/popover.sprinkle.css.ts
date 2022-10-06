import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { properties as colors } from "../../sprinkles/colors.css";
import { varsThemeBase } from "../../themes/base.css";

export const backgroundColorProperties = {
  primary: colors["primary.surfaceHighlight"],
  success: colors["success.surfaceHighlight"],
  danger: colors["danger.surfaceHighlight"],
  neutral: colors["neutral.surfaceHighlight"],
  warning: colors["warning.surfaceHighlight"],
  light: colors["neutral.background"],
};

export const colorProperties = backgroundColorProperties;

export const paddingProperties = {
  base: varsThemeBase.spacing[4],
  none: 0,
};

export const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      backgroundColor: backgroundColorProperties,
      color: colorProperties,
      padding: paddingProperties,
    },
  })
);
