import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { colorProperties } from "../../../properties";

const spinnerColorProperties = {
  "primary.surface": colorProperties["primary.surface"],
  "primary.interactive": colorProperties["primary.interactive"],
  "primary.textLow": colorProperties["primary.textLow"],

  "success.surface": colorProperties["success.surface"],
  "success.interactive": colorProperties["success.interactive"],
  "success.textLow": colorProperties["success.textLow"],

  "danger.surface": colorProperties["danger.surface"],
  "danger.interactive": colorProperties["danger.interactive"],
  "danger.textLow": colorProperties["danger.textLow"],

  "neutral.background": colorProperties["neutral.background"],
  "neutral.surface": colorProperties["neutral.surface"],
  "neutral.interactive": colorProperties["neutral.interactive"],
  "neutral.textLow": colorProperties["neutral.textLow"],
};

const properties = {
  color: spinnerColorProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const spinnerSprinkle = {
  sprinkle,
  properties,
};
