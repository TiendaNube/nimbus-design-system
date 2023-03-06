import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import { paddingProperties } from "../../../properties";
import { mediaQueries } from "../../../themes";

const properties = {
  padding: paddingProperties,
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
    xl: {
      "@media": mediaQueries.xl(),
    },
  },
  defaultCondition: "xs",
  dynamicProperties: {
    maxWidth: true,
    padding: paddingProperties,
  },
});

const sprinkle = createRainbowSprinkles(defineProperties);

export const modalSprinkle = {
  sprinkle,
  properties,
};
