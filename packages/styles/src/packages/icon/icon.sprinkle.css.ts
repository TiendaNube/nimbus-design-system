import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { properties as colors } from "../../sprinkles/colors.css";

export const properties = {
  "primary.background": colors["primary.background"],
  "primary.interactive": colors["primary.interactive"],
  "primary.textLow": colors["primary.textLow"],
  "primary.textHigh": colors["primary.textHigh"],

  "success.background": colors["success.background"],
  "success.interactive": colors["primary.interactive"],
  "success.textLow": colors["success.textLow"],
  "success.textHigh": colors["success.textHigh"],

  "warning.background": colors["warning.background"],
  "warning.interactive": colors["primary.interactive"],
  "warning.textLow": colors["warning.textLow"],
  "warning.textHigh": colors["warning.textHigh"],

  "danger.background": colors["danger.background"],
  "danger.interactive": colors["primary.interactive"],
  "danger.textLow": colors["danger.textLow"],
  "danger.textHigh": colors["danger.textHigh"],

  "neutral.background": colors["neutral.background"],
  "neutral.interactive": colors["primary.interactive"],
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
