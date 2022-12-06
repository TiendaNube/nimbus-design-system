import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

export const cursorProperties = {
  pointer: "pointer",
  auto: "auto",
};

export const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      cursor: cursorProperties,
    },
  })
);
