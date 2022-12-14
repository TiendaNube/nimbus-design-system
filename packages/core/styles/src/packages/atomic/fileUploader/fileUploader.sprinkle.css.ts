import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { cursorProperties } from "../../../properties";
import { thumbnail } from "../thumbnail";

const fileUploaderAspectRatioProperties = [
  "none",
  ...thumbnail.properties.aspectRatio,
] as const;

const fileUploaderFlexDirectionProperties = ["row", "column"] as const;

const properties = {
  aspectRatio: fileUploaderAspectRatioProperties,
  flexDirection: fileUploaderFlexDirectionProperties,
  cursor: cursorProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const fileUploaderSprinkle = {
  sprinkle,
  properties,
};
