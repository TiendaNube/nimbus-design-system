import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { backgroundColorProperties , paddingProperties } from "../../../properties";

const cardBackgroundColorProperties = {
  "primary.surface": backgroundColorProperties["primary.surface"],
  "primary.surfaceHighlight":
    backgroundColorProperties["primary.surfaceHighlight"],
  "success.surface": backgroundColorProperties["success.surface"],
  "success.surfaceHighlight":
    backgroundColorProperties["success.surfaceHighlight"],
  "danger.surface": backgroundColorProperties["danger.surface"],
  "danger.surfaceHighlight":
    backgroundColorProperties["danger.surfaceHighlight"],
  "warning.surface": backgroundColorProperties["warning.surface"],
  "warning.surfaceHighlight":
    backgroundColorProperties["warning.surfaceHighlight"],
  "neutral.background": backgroundColorProperties["neutral.background"],
  "neutral.surface": backgroundColorProperties["neutral.surface"],
  "neutral.surfaceHighlight":
    backgroundColorProperties["neutral.surfaceHighlight"],
};

const properties = {
  backgroundColor: cardBackgroundColorProperties,
  padding: paddingProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const cardSprinkle = {
  sprinkle,
  properties,
};
