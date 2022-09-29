import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { properties as colors } from "../../sprinkles/colors.css";

export const properties = {
  "primary.interactive": colors["primary.interactive"],
  "primary.textLow": colors["primary.textLow"],

  "success.interactive": colors["success.interactive"],
  "success.textLow": colors["success.textLow"],

  "danger.interactive": colors["danger.interactive"],
  "danger.textLow": colors["danger.textLow"],

  "neutral.background": colors["neutral.background"],
  "neutral.interactive": colors["neutral.interactive"],
  "neutral.textLow": colors["neutral.textLow"],
};

export const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      color: properties,
    },
  })
);
