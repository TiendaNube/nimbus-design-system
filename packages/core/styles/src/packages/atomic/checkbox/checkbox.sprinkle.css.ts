import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { borderColorProperties, cursorProperties } from "../../../properties";

const checkboxBorderColorProperties = {
  "primary.interactive": borderColorProperties["primary.interactive"],
  "danger.interactive": borderColorProperties["danger.interactive"],
  "neutral.interactive": borderColorProperties["neutral.interactive"],
};

const properties = {
  borderColor: checkboxBorderColorProperties,
  cursor: cursorProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const checkboxSprinkle = {
  sprinkle,
  properties,
};
