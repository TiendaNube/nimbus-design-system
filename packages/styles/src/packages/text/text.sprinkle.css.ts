import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

import * as base from "../../sprinkles/colors.css";

export const properties = {
  "primary.background": base.properties["primary.background"],
  "primary.interactive": base.properties["primary.interactive"],
  "primary.textLow": base.properties["primary.textLow"],
  "primary.textHigh": base.properties["primary.textHigh"],

  "success.background": base.properties["success.background"],
  "success.interactive": base.properties["success.interactive"],
  "success.textLow": base.properties["success.textLow"],
  "success.textHigh": base.properties["success.textHigh"],

  "warning.background": base.properties["warning.background"],
  "warning.interactive": base.properties["warning.interactive"],
  "warning.textLow": base.properties["warning.textLow"],
  "warning.textHigh": base.properties["warning.textHigh"],

  "danger.background": base.properties["danger.background"],
  "danger.interactive": base.properties["danger.interactive"],
  "danger.textLow": base.properties["danger.textLow"],
  "danger.textHigh": base.properties["danger.textHigh"],

  "neutral.background": base.properties["neutral.background"],
  "neutral.interactive": base.properties["neutral.interactive"],
  "neutral.textLow": base.properties["neutral.textLow"],
  "neutral.textHigh": base.properties["neutral.textHigh"],
};

export const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      color: properties,
    },
  })
);
