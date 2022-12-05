import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { thumbnail } from "../thumbnail";

export const aspectRatioProperties = {
  none: "none",
  ...thumbnail.properties.aspectRatio,
};
export const flexDirectionProperties = {
  row: "row",
  column: "column",
} as const;

export const cursorProperties = {
  pointer: "pointer",
  auto: "auto",
};

export const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      aspectRatio: aspectRatioProperties,
      flexDirection: flexDirectionProperties,
      cursor: cursorProperties,
    },
  })
);
