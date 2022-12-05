import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

export const aspectRatioProperties = {
  "1-1": "1/1",
  "16-9": "16/9",
  "9-16": "9/16",
  "4-3": "4/3",
  "3-4": "3/4",
  "2-1": "2/1",
  "1-2": "1/2",
};

export const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      aspectRatio: aspectRatioProperties,
    },
  })
);
