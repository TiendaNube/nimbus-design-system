import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import { paddingProperties } from "../../../properties";
import { mediaQueries } from "../../../themes";

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
  },
  defaultCondition: "xs",
  dynamicProperties: {
    maxWidth: true,
    zIndex: true,
  },
  staticProperties: {
    padding: paddingProperties,
  },
});

const sprinkle = createRainbowSprinkles(defineProperties);

export const sidebarSprinkle = {
  sprinkle,
  properties: {
    padding: paddingProperties,
  },
};
