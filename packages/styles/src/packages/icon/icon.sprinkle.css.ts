import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

import * as base from "../../sprinkles/colors.css";

export const properties = {
  "primary.background": base.properties["primary.background"],
  "primary.textLow": base.properties["primary.textLow"],
  "primary.textHigh": base.properties["primary.textHigh"],

  "success.background": base.properties["success.background"],
  "success.textLow": base.properties["success.textLow"],
  "success.textHigh": base.properties["success.textHigh"],

  "warning.background": base.properties["warning.background"],
  "warning.textLow": base.properties["warning.textLow"],
  "warning.textHigh": base.properties["warning.textHigh"],

  "danger.background": base.properties["danger.background"],
  "danger.textLow": base.properties["danger.textLow"],
  "danger.textHigh": base.properties["danger.textHigh"],

  "neutral.background": base.properties["neutral.background"],
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
