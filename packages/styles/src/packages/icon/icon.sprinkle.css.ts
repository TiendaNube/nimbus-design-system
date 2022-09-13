import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { properties as colors } from "../../sprinkles/colors.css";

export const properties = {
  "primary.background": colors["primary.background"],
  "primary.textLow": colors["primary.textLow"],
  "primary.textHigh": colors["primary.textHigh"],

  "success.background": colors["success.background"],
  "success.textLow": colors["success.textLow"],
  "success.textHigh": colors["success.textHigh"],

  "warning.background": colors["warning.background"],
  "warning.textLow": colors["warning.textLow"],
  "warning.textHigh": colors["warning.textHigh"],

  "danger.background": colors["danger.background"],
  "danger.textLow": colors["danger.textLow"],
  "danger.textHigh": colors["danger.textHigh"],

  "neutral.background": colors["neutral.background"],
  "neutral.textLow": colors["neutral.textLow"],
  "neutral.textHigh": colors["neutral.textHigh"],
};

export const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      color: properties,
    },
  })
);
