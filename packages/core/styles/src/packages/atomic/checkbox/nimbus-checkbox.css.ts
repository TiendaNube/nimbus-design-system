import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { style, globalStyle } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";
import { borderColorProperties, cursorProperties } from "../../../properties";
import { gradients, createBorderGradient } from "../../../gradients";

const checkboxTheme = varsThemeBase.components.checkbox;

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
  backgroundColor: checkboxTheme.disabled.background,
  borderColor: checkboxTheme.disabled.borderColor,
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
  fontSize: checkboxTheme.label.fontSize,
});

globalStyle(`${container} input:focus-visible ~ ${container__checkmark}`, {
  boxShadow: checkboxTheme.focus.boxShadow,
});

globalStyle(`${container__checkmark_checkindeterminate} > div`, {
  color: checkboxTheme.indeterminate.color,
});

globalStyle(
  `${container} input:disabled ~ ${container__checkmark} ${container__checkmark_checkindeterminate} > div`,
  {
    color: checkboxTheme.disabled.indeterminateColor,
  }
);

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

const checkboxProperties = defineProperties({
  properties,
});

const sprinkle = createSprinkles(checkboxProperties);

export const checkboxSprinkle = {
  sprinkle,
  properties,
};

/* -------------------------------------------------------------------------------------------------
 * Hover and pressed
 * Uses the border color sprinkle classes, so each appearance keeps its own
 * border color. The base theme values repeat the rest colors.
 * -----------------------------------------------------------------------------------------------*/

const appearanceBorders = {
  neutral: "neutral-interactive",
  danger: "danger-interactive",
  primary: "primary-interactive",
} as const;

(
  Object.keys(appearanceBorders) as Array<keyof typeof appearanceBorders>
).forEach((key) => {
  const borderClass = `.${
    checkboxProperties.styles.borderColor.values[appearanceBorders[key]]
      .defaultClass
  }`;

  globalStyle(
    `${container}:hover input:enabled:not(:checked) ~ ${borderClass}`,
    {
      backgroundColor: checkboxTheme.hover.background,
      borderColor: checkboxTheme.hover.borderColor[key],
    }
  );

  globalStyle(
    `${container}:active input:enabled:not(:checked) ~ ${borderClass}`,
    {
      backgroundColor: checkboxTheme.pressed.background,
      borderColor: checkboxTheme.pressed.borderColor[key],
    }
  );
});

globalStyle(
  `${container}:hover input:enabled:checked ~ ${container__checkmark}:not(${container__checkmark_aiGenerated})`,
  {
    backgroundColor: checkboxTheme.checked.hover.background,
    borderColor: checkboxTheme.checked.hover.background,
  }
);

globalStyle(
  `${container}:active input:enabled:checked ~ ${container__checkmark}:not(${container__checkmark_aiGenerated})`,
  {
    backgroundColor: checkboxTheme.checked.pressed.background,
    borderColor: checkboxTheme.checked.pressed.background,
  }
);
