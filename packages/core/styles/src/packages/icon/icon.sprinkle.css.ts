import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { properties as colors } from "../../sprinkles/colors.css";

export const colorProperties = {
  "primary.interactive": colors["primary.interactive"],
  "primary.textLow": colors["primary.textLow"],
  "primary.textHigh": colors["primary.textHigh"],

  "success.interactive": colors["success.interactive"],
  "success.textLow": colors["success.textLow"],
  "success.textHigh": colors["success.textHigh"],

  "warning.interactive": colors["warning.interactive"],
  "warning.textLow": colors["warning.textLow"],
  "warning.textHigh": colors["warning.textHigh"],

  "danger.interactive": colors["danger.interactive"],
  "danger.textLow": colors["danger.textLow"],
  "danger.textHigh": colors["danger.textHigh"],

  "neutral.background": colors["neutral.background"],
  "neutral.interactive": colors["neutral.interactive"],
  "neutral.textLow": colors["neutral.textLow"],
  "neutral.textDisabled": colors["neutral.textDisabled"],
  "neutral.textHigh": colors["neutral.textHigh"],
};

export const cursorProperties = ["auto", "pointer"] as const;

export const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      color: colorProperties,
      cursor: cursorProperties,
    },
  })
);
