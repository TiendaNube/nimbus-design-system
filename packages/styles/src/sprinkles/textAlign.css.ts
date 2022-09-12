import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

export const properties = {
  left: "left",
  right: "right",
  center: "center",
  justify: "justify",
} as const;

const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      textAlign: properties,
    },
  })
);

export const textAlign = {
  sprinkle,
  properties,
};
