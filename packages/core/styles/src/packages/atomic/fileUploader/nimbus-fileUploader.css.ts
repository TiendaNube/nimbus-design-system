import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { style } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";
import { vars } from "../../../utils";
import { cursorProperties, aspectRatioProperties } from "../../../properties";

/* -------------------------------------------------------------------------------------------------
 * Styles
 * -----------------------------------------------------------------------------------------------*/

export const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: varsThemeBase.sizes[1],
  width: vars.width,
  height: vars.height,
  background: varsThemeBase.colors.primary.surface,
  borderRadius: varsThemeBase.spacing[2],
  borderWidth: varsThemeBase.sizes["0,5"],
  borderStyle: "dashed",
  borderColor: varsThemeBase.colors.primary.interactive,
  cursor: "pointer",
});

const container__input = style({
  display: "none",
});

const disabled = style({
  background: varsThemeBase.colors.neutral.surfaceDisabled,
  borderColor: varsThemeBase.colors.neutral.interactive,
});

export const skeleton = style({
  display: "flex",
});

export const styles = {
  container,
  container__input,
  disabled,
  skeleton,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkles
 * -----------------------------------------------------------------------------------------------*/

const fileUploaderAspectRatioProperties = [
  "none",
  ...aspectRatioProperties,
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
