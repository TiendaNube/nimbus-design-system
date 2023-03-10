import { style } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

import { varsThemeBase } from "../../../themes";
import { vars } from "../../../utils";
import { aspectRatioProperties } from "../../../properties";

export const container = style({
  display: "flex",
  background: varsThemeBase.colors.neutral.surfaceDisabled,
  borderRadius: varsThemeBase.spacing[2],
  width: vars.width,
  overflow: "hidden",
});

export const container__image = style({
  width: "100%",
  objectFit: "cover",
});

export const container__placeholder = style({
  width: "100%",
  objectFit: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const skeleton = style({
  display: "flex",
});

export const styles = {
  container,
  container__image,
  container__placeholder,
  skeleton,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkles
 * -----------------------------------------------------------------------------------------------*/

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
