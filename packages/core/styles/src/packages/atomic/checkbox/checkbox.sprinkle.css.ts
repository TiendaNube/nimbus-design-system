import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { properties as colors } from "../../../sprinkles/colors.css";

export const borderColorProperties = {
  "primary.interactive": colors["primary.interactive"],
  "danger.interactive": colors["danger.interactive"],
  "neutral.interactive": colors["neutral.interactive"],
};

export const cursorProperties = {
  pointer: "pointer",
  auto: "auto",
};

export const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      borderColor: borderColorProperties,
      cursor: cursorProperties,
    },
  })
);
