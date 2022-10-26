import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

import { properties as colors } from "../../sprinkles/colors.css";
import { properties as textAlignProperties } from "../../sprinkles/textAlign.css";

const colorsProperties = {
  "primary.textHigh": colors["primary.textHigh"],
  "primary.textLow": colors["primary.textLow"],
  "success.textHigh": colors["success.textHigh"],
  "success.textLow": colors["success.textLow"],
  "warning.textHigh": colors["warning.textHigh"],
  "warning.textLow": colors["warning.textLow"],
  "danger.textHigh": colors["danger.textHigh"],
  "danger.textLow": colors["danger.textLow"],
  "neutral.textHigh": colors["neutral.textHigh"],
  "neutral.textLow": colors["neutral.textLow"],
};

export const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      color: colorsProperties,
      textAlign: textAlignProperties,
    },
  })
);

export { textAlignProperties, colorsProperties };
