import { style } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

import { varsThemeBase } from "../../../themes";
import { vars } from "../../../utils";
import { aspectRatioProperties } from "../../../properties";

export const container = style({
  display: "flex",
  overflow: "hidden",
  background: varsThemeBase.colors.neutral.surfaceDisabled,
  borderRadius: varsThemeBase.shape.border.radius[2],
});

export const width = style({
  width: vars.width,
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
  width,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
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
