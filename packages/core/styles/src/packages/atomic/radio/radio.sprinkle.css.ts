import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { cursorProperties } from "../../../properties";

const properties = {
  cursor: cursorProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const radioSprinkle = {
  sprinkle,
  properties,
};
