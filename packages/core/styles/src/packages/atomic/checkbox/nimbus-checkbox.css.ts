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
  minWidth: "1rem",
  minHeight: "1rem",
  width: "1rem",
  height: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  flexShrink: 0,

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

// Disabled checkmark (all variants): Figma nodes 19754-83328, 19754-83333, 19754-83338 — surfaceHighlight fill + neutral.interactive border
globalStyle(`${container} input:disabled ~ ${container__checkmark}`, {
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  borderColor: varsThemeBase.colors.neutral.interactive,
});

globalStyle(
  `${container}[data-indeterminate] input:disabled ~ ${container__checkmark} ${container__checkmark_checkindeterminate} > div`,
  {
    color: varsThemeBase.colors.neutral.textDisabled,
  }
);

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

// Hover states — require data-appearance and data-indeterminate on the container label
// Primary unchecked hover: Figma node 19754-83261 — neutral.surface fill + neutral.interactiveHover border
globalStyle(
  `${container}[data-appearance="primary"]:not([data-indeterminate]):hover input:not(:checked):not(:disabled) ~ ${container__checkmark}`,
  {
    backgroundColor: varsThemeBase.colors.neutral.surface,
    borderColor: varsThemeBase.colors.neutral.interactiveHover,
  }
);

globalStyle(
  `${container}[data-appearance="primary"]:not([data-indeterminate]):hover input:checked:not(:disabled) ~ ${container__checkmark}`,
  {
    backgroundColor: varsThemeBase.colors.primary.interactiveHover,
    borderColor: varsThemeBase.colors.primary.interactiveHover,
  }
);

globalStyle(
  `${container}[data-indeterminate]:hover input:not(:disabled) ~ ${container__checkmark}`,
  {
    backgroundColor: varsThemeBase.colors.neutral.surface,
    borderColor: varsThemeBase.colors.primary.interactiveHover,
  }
);

// Primary unchecked pressed: Figma node 19754-83266 — neutral.surface fill + neutral.interactivePressed border
globalStyle(
  `${container}[data-appearance="primary"]:not([data-indeterminate]):active input:not(:checked):not(:disabled) ~ ${container__checkmark}`,
  {
    backgroundColor: varsThemeBase.colors.neutral.surface,
    borderColor: varsThemeBase.colors.neutral.interactivePressed,
  }
);

// Indeterminate pressed: Figma node 19754-83316 — neutral.surface fill + primary.interactivePressed border; bar uses same token
globalStyle(
  `${container}[data-indeterminate]:active input:not(:disabled) ~ ${container__checkmark}`,
  {
    backgroundColor: varsThemeBase.colors.neutral.surface,
    borderColor: varsThemeBase.colors.primary.interactivePressed,
  }
);

globalStyle(
  `${container}[data-indeterminate]:active input:not(:disabled) ~ ${container__checkmark} ${container__checkmark_checkindeterminate} > div`,
  {
    color: varsThemeBase.colors.primary.interactivePressed,
  }
);

globalStyle(
  `${container}[data-appearance="danger"]:hover input:not(:checked):not(:disabled) ~ ${container__checkmark}`,
  {
    backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
    borderColor: varsThemeBase.colors.danger.interactiveHover,
  }
);

// Danger unchecked pressed: Figma node 19754-83354 — neutral.surface fill + danger.interactivePressed border (after hover so pressed wins)
globalStyle(
  `${container}[data-appearance="danger"]:active input:not(:checked):not(:disabled) ~ ${container__checkmark}`,
  {
    backgroundColor: varsThemeBase.colors.neutral.surface,
    borderColor: varsThemeBase.colors.danger.interactivePressed,
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

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const checkboxSprinkle = {
  sprinkle,
  properties,
};
