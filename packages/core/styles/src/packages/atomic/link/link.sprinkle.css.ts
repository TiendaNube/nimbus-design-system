import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import {
  textDecorationProperties,
  lineHeightProperties,
  fontSizeProperties,
} from "../../../properties";

const properties = {
  textDecoration: textDecorationProperties,
  fontSize: fontSizeProperties,
  lineHeight: lineHeightProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const linkSprinkle = {
  sprinkle,
  properties,
};
