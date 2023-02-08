import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { baseColors } from "../../../properties";

const border = {
  none: "none",
  base: `1px solid ${baseColors["neutral.surfaceHighlight"]}`,
};

const properties = {
  borderTop: border,
  borderBottom: border,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const accordionSprinkle = {
  sprinkle,
  properties,
};
