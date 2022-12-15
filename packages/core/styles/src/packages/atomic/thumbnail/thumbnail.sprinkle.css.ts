import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { aspectRatioProperties } from "../../../properties";

const properties = {
  aspectRatio: aspectRatioProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const thumbnailSprinkle = {
  sprinkle,
  properties,
};
