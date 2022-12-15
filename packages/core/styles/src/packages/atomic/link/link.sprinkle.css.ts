import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { textDecorationProperties } from "../../../properties";

const properties = {
  textDecoration: textDecorationProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const linkSprinkle = {
  sprinkle,
  properties,
};
