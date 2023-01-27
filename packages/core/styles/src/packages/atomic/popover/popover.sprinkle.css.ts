import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import {
  backgroundColorProperties,
  paddingProperties,
} from "../../../properties";

const popoverBackgroundColorProperties = {
  "primary.surfaceHighlight":
    backgroundColorProperties["primary.surfaceHighlight"],
  "primary.interactiveHover":
    backgroundColorProperties["primary.interactiveHover"],
  "success.surfaceHighlight":
    backgroundColorProperties["success.surfaceHighlight"],
  "danger.surfaceHighlight":
    backgroundColorProperties["danger.surfaceHighlight"],
  "neutral.surfaceHighlight":
    backgroundColorProperties["neutral.surfaceHighlight"],
  "warning.surfaceHighlight":
    backgroundColorProperties["warning.surfaceHighlight"],
  "neutral.background": backgroundColorProperties["neutral.background"],
};

const popoverColorProperties = popoverBackgroundColorProperties;

const properties = {
  backgroundColor: popoverBackgroundColorProperties,
  color: popoverColorProperties,
  padding: paddingProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const popoverSprinkle = {
  sprinkle,
  properties,
};
