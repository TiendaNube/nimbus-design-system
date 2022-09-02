import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

import * as base from "../../sprinkles/colors.css";

export const properties = {
  "primary.textHigh": base.properties["primary.textHigh"],
  "success.textHigh": base.properties["success.textHigh"],
  "warning.textHigh": base.properties["warning.textHigh"],
  "danger.textHigh": base.properties["danger.textHigh"],
  "neutral.textHigh": base.properties["neutral.textHigh"],
};

export const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      color: properties,
    },
  })
);
