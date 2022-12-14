import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import {
  backgroundColorProperties,
  borderColorProperties,
} from "../../../properties";
import { mediaQueries } from "../../../themes";

const iconButtonBackgroundColorProperties = {
  transparent: "transparent",
  "neutral.interactive": backgroundColorProperties["neutral.interactive"],
  "neutral.surfaceHighlight":
    backgroundColorProperties["neutral.surfaceHighlight"],
  "neutral.interactivePressed":
    backgroundColorProperties["neutral.interactivePressed"],
};

const iconButtonBorderColorProperties = {
  ...iconButtonBackgroundColorProperties,
  "neutral.interactive": borderColorProperties["neutral.interactive"],
  "neutral.interactiveHover": borderColorProperties["neutral.interactiveHover"],
};

const properties = {
  backgroundColor: iconButtonBackgroundColorProperties,
  borderColor: iconButtonBorderColorProperties,
};

const defineProperties = defineRainbowProperties({
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
    ...properties,
  },
  shorthands: {
    size: ["width", "height"],
  },
});

const sprinkle = createRainbowSprinkles(defineProperties);

export const iconButtonSprinkle = {
  sprinkle,
  properties,
};
