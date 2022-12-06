import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { properties as colors } from "../../../sprinkles/colors.css";
import { varsThemeBase } from "../../../themes/base.css";

export const backgroundColorProperties = {
  "primary.surface": colors["primary.surface"],
  "primary.surfaceHighlight": colors["primary.surfaceHighlight"],
  "success.surface": colors["success.surface"],
  "success.surfaceHighlight": colors["success.surfaceHighlight"],
  "danger.surface": colors["danger.surface"],
  "danger.surfaceHighlight": colors["danger.surfaceHighlight"],
  "warning.surface": colors["warning.surface"],
  "warning.surfaceHighlight": colors["warning.surfaceHighlight"],
  "neutral.background": colors["neutral.background"],
  "neutral.surface": colors["neutral.surface"],
  "neutral.surfaceHighlight": colors["neutral.surfaceHighlight"],
};

export const paddingProperties = {
  base: varsThemeBase.spacing[4],
  none: 0,
};

export const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      backgroundColor: backgroundColorProperties,
      padding: paddingProperties,
    },
  })
);
