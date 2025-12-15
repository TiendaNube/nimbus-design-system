import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { style, globalStyle } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";
import { borderColorProperties, cursorProperties } from "../../../properties";
import { gradients, createBorderGradient } from "../../../gradients";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const container = style({
  display: "flex",
  alignItems: "flex-start",
  width: "fit-content",
  position: "relative",
  gap: varsThemeBase.spacing[1],
});

const container__input = style({
  position: "absolute",
  overflow: "hidden",
  opacity: 0,
  height: 0,
  width: 0,
});

const container__checkmark = style({
  minWidth: "0.875rem",
  minHeight: "0.875rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",

  borderStyle: "solid",
  borderWidth: varsThemeBase.shape.border.width[1],
  borderRadius: varsThemeBase.shape.border.radius[1],
  backgroundColor: varsThemeBase.colors.neutral.background,
});

const container__checkmark_checkicon = style({
  display: "none",
});

const container__checkmark_checkindeterminate = style({
  display: "block",
});

globalStyle(`${container} input:checked ~ ${container__checkmark}`, {
  backgroundColor: varsThemeBase.colors.primary.interactive,
  borderColor: varsThemeBase.colors.primary.interactive,
});

globalStyle(`${container} input:disabled ~ ${container__checkmark}`, {
  backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
  borderColor: varsThemeBase.colors.neutral.interactive,
});

globalStyle(
  `${container} input:checked ~ ${container__checkmark} ${container__checkmark_checkicon}`,
  {
    display: "block",
  }
);

globalStyle(
  `${container} input:checked ~ ${container__checkmark} ${container__checkmark_checkindeterminate}`,
  {
    display: "none",
  }
);

globalStyle(`${container} p`, {
  lineHeight: varsThemeBase.spacing[4],
});

globalStyle(`${container} input:focus-visible ~ ${container__checkmark}`, {
  boxShadow: varsThemeBase.utils.focus,
});

const container__checkmark_aiGenerated = style({
  background: createBorderGradient(
    gradients.aiGenerativeInteractive,
    varsThemeBase.colors.neutral.background
  ),
  borderColor: "transparent",
  boxShadow: varsThemeBase.utils.aiFocus,
});
export const aiGenerated = container__checkmark_aiGenerated;

export const styles = {
  container,
  container__input,
  container__checkmark,
  container__checkmark_checkicon,
  container__checkmark_checkindeterminate,
  container__checkmark_aiGenerated,
};

globalStyle(
  `${container} input:checked ~ ${container__checkmark_aiGenerated}`,
  {
    background: createBorderGradient(
      gradients.aiGenerativeInteractive,
      varsThemeBase.colors.primary.interactive
    ),
    borderColor: "transparent",
    backgroundColor: "transparent",
  }
);

globalStyle(
  `${container} input:disabled ~ ${container__checkmark_aiGenerated}`,
  {
    background: createBorderGradient(
      gradients.aiGenerativeInteractive,
      varsThemeBase.colors.neutral.surfaceDisabled
    ),
    borderColor: "transparent",
    backgroundColor: "transparent",
  }
);

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const checkboxBorderColorProperties = {
  "primary-interactive": borderColorProperties["primary-interactive"],
  "danger-interactive": borderColorProperties["danger-interactive"],
  "neutral-interactive": borderColorProperties["neutral-interactive"],
};

const properties = {
  borderColor: checkboxBorderColorProperties,
  cursor: cursorProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const checkboxSprinkle = {
  sprinkle,
  properties,
};
