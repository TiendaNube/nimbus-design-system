import { keyframes, style } from "@vanilla-extract/css";

import { createRainbowSprinkles, defineProperties } from "rainbow-sprinkles";
import { varsThemeBase, mediaQueries } from "../../../themes";

const container = style({
  width: "fit-content",
});

const tooltipEnter = keyframes({
  from: {
    opacity: 0,
    transform: "scale(0.97)",
  },
  to: {
    opacity: 1,
    transform: "scale(1)",
  },
});

const content = style({
  width: "fit-content",
  backgroundColor: varsThemeBase.colors.neutral.textHigh,
  padding: varsThemeBase.spacing[1],
  borderRadius: varsThemeBase.shape.border.radius[1],
  animation: `${tooltipEnter} ${varsThemeBase.motion.duration[1]} ${varsThemeBase.motion.easing.out.quart} both`,
  transformOrigin: "center",
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
