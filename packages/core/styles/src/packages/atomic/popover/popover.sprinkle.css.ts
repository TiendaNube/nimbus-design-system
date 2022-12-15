import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import {
  backgroundColorProperties,
  paddingProperties,
} from "../../../properties";

const popoverBackgroundColorProperties = {
  primary: backgroundColorProperties["primary.surfaceHighlight"],
  success: backgroundColorProperties["success.surfaceHighlight"],
  danger: backgroundColorProperties["danger.surfaceHighlight"],
  neutral: backgroundColorProperties["neutral.surfaceHighlight"],
  warning: backgroundColorProperties["warning.surfaceHighlight"],
  light: backgroundColorProperties["neutral.background"],
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
