import { createRainbowSprinkles, defineProperties } from "rainbow-sprinkles";
import { varsThemeBase } from "../../../themes/base.css";
import { mediaQueries } from "../../../themes/mediaQueries";

export const paddingProperties = {
  base: varsThemeBase.spacing[4],
  none: 0,
};

export const sprinkle = createRainbowSprinkles(
  defineProperties({
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
    },
    defaultCondition: "xs",
    dynamicProperties: {
      maxWidth: true,
      zIndex: true,
    },
    staticProperties: {
      padding: paddingProperties,
    },
  })
);
