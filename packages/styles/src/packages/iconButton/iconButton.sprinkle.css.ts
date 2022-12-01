import { createRainbowSprinkles, defineProperties } from "rainbow-sprinkles";
import { properties as colors } from "../../sprinkles/colors.css";
import { mediaQueries } from "../../themes/mediaQueries";

export const backgroundColorProperties = {
  transparent: "transparent",
  "neutral.interactive": colors["neutral.interactive"],
  "neutral.surfaceHighlight": colors["neutral.surfaceHighlight"],
  "neutral.interactivePressed": colors["neutral.interactivePressed"],
};

export const borderColorProperties = {
  ...backgroundColorProperties,
  "neutral.interactive": colors["neutral.interactive"],
  "neutral.interactiveHover": colors["neutral.interactiveHover"],
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
      active: { selector: "&:active" },
      hover: { selector: "&:hover" },
      focus: { selector: "&:focus" },
    },
    defaultCondition: "xs",
    staticProperties: {},
    dynamicProperties: {
      width: true,
      height: true,
      backgroundColor: backgroundColorProperties,
      borderColor: borderColorProperties,
    },
    shorthands: {
      size: ["width", "height"],
    },
  })
);
