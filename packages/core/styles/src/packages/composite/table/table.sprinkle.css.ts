import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import { paddingProperties } from "../../../properties";

const defineProperties = defineRainbowProperties({
  dynamicProperties: {
    width: true,
    maxWidth: true,
    minWidth: true,
  },
  staticProperties: {
    padding: paddingProperties,
  },
});

const sprinkle = createRainbowSprinkles(defineProperties);

export const tableSprinkle = {
  sprinkle,
  properties: {
    padding: paddingProperties,
  },
};
