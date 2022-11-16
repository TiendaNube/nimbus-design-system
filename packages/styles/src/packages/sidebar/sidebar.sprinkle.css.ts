import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { varsThemeBase } from "../../themes/base.css";

export const paddingProperties = {
  base: varsThemeBase.spacing[4],
  none: 0,
};

export const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      padding: paddingProperties,
    },
  })
);
