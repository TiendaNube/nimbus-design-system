import { style } from "@vanilla-extract/css";

import { createRainbowSprinkles, defineProperties } from "rainbow-sprinkles";
import { varsThemeBase, mediaQueries } from "../../../themes";

const container = style({
  width: "fit-content",
});

const content = style({
  width: "fit-content",
  backgroundColor: varsThemeBase.colors.neutral.textHigh,
  padding: varsThemeBase.spacing[1],
  borderRadius: varsThemeBase.shape.border.radius[1],
  transition: `opacity ${varsThemeBase.motion.speed.fast} ease`,
  zIndex: varsThemeBase.zIndex[800],
});

export const styles = {
  container,
  content,
};

const properties = defineProperties({
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
    maxWidth: true,
  },
});

const sprinkle = createRainbowSprinkles(properties);

export const tootipSprinkle = {
  sprinkle,
  properties,
};
