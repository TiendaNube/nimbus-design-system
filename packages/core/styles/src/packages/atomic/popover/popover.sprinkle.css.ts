import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import { mediaQueries } from "../../../themes";

import {
  backgroundColorProperties,
  paddingProperties,
} from "../../../properties";

const popoverBackgroundColorProperties = {
  "primary.surfaceHighlight":
    backgroundColorProperties["primary.surfaceHighlight"],
  "primary.interactiveHover":
    backgroundColorProperties["primary.interactiveHover"],
  "success.surfaceHighlight":
    backgroundColorProperties["success.surfaceHighlight"],
  "danger.surfaceHighlight":
    backgroundColorProperties["danger.surfaceHighlight"],
  "neutral.surfaceHighlight":
    backgroundColorProperties["neutral.surfaceHighlight"],
  "warning.surfaceHighlight":
    backgroundColorProperties["warning.surfaceHighlight"],
  "neutral.background": backgroundColorProperties["neutral.background"],
};

const popoverColorProperties = popoverBackgroundColorProperties;

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
    xl: {
      "@media": mediaQueries.xl(),
    },
  },
  defaultCondition: "xs",
  dynamicProperties: {
    width: true,
    height: true,
    zIndex: true,
  },
  staticProperties: {
    backgroundColor: popoverBackgroundColorProperties,
    padding: paddingProperties,
    color: popoverColorProperties,
  },
});

const properties = {
  backgroundColor: popoverBackgroundColorProperties,
  color: popoverColorProperties,
  padding: paddingProperties,
};

const sprinkle = createRainbowSprinkles(defineProperties);

export const popoverSprinkle = {
  sprinkle,
  properties,
};
