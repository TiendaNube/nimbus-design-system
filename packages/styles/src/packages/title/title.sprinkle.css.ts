import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

import { properties as colors } from "../../sprinkles/colors.css";
import {
  TextAlign,
  properties as textAlignProperties,
} from "../../sprinkles/textAlign.css";

const colorsProperties = {
  "primary.textHigh": colors["primary.textHigh"],
  "success.textHigh": colors["success.textHigh"],
  "warning.textHigh": colors["warning.textHigh"],
  "danger.textHigh": colors["danger.textHigh"],
  "neutral.textHigh": colors["neutral.textHigh"],
};

export const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      color: colorsProperties,
      textAlign: Object.keys(textAlignProperties) as TextAlign[],
    },
  })
);

export { textAlignProperties, colorsProperties };
