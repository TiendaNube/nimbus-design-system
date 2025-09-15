import { style as vanillaStyle, globalStyle } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

export const container = vanillaStyle({
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  gap: varsThemeBase.spacing[1],
  position: "relative",
  cursor: "pointer",
  borderRadius: varsThemeBase.shape.border.radius.full,
});

export const container__input = vanillaStyle({
  position: "absolute",
  overflow: "hidden",
  opacity: 0,
  height: 0,
  width: 0,
});

export const container__slider = vanillaStyle({
  width: "2rem",
  height: "1rem",
  display: "flex",

  alignItems: "center",
  justifyContent: "center",
  position: "relative",

  borderStyle: "solid",
  borderRadius: varsThemeBase.shape.border.radius.full,
  borderWidth: varsThemeBase.shape.border.width[1],
  borderColor: varsThemeBase.colors.neutral.interactive,
  backgroundColor: varsThemeBase.colors.neutral.interactive,
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  ":before": {
    content: "",
    position: "absolute",
    width: "0.875rem",
    height: "0.875rem",
    left: "0.063rem",

    backgroundColor: varsThemeBase.colors.neutral.background,
    borderRadius: varsThemeBase.shape.border.radius.half,
    transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  },

  ":hover": {
    borderColor: varsThemeBase.colors.neutral.interactiveHover,
    backgroundColor: varsThemeBase.colors.neutral.interactiveHover,
  },

  ":active": {
    borderColor: varsThemeBase.colors.neutral.interactivePressed,
  },
});

globalStyle(`${container}:has(${container__input}:focus-visible)`, {
  boxShadow: varsThemeBase.utils.focus,
  outline: "none",
});

globalStyle(`${container} input:checked ~ ${container__slider}`, {
  borderColor: varsThemeBase.colors.primary.interactive,
  backgroundColor: varsThemeBase.colors.primary.interactive,
});

globalStyle(`${container} input:checked ~ ${container__slider}:before`, {
  backgroundColor: varsThemeBase.colors.neutral.background,
  left: "1.063rem",
});

globalStyle(`${container__slider}:hover:before`, {
  backgroundColor: varsThemeBase.colors.neutral.surface,
});

globalStyle(`${container__slider}:active:before`, {
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
});

globalStyle(`${container} input:checked ~ ${container__slider}:hover:before`, {
  backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
});

globalStyle(`${container} input:checked ~ ${container__slider}:active:before`, {
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
});

// Disabled state
globalStyle(`${container}:has(${container__input}:disabled)`, {
  cursor: "default",
});

globalStyle(`${container} input:disabled ~ ${container__slider}`, {
  borderColor: varsThemeBase.colors.neutral.surfaceDisabled,
  backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
});

globalStyle(`${container} input:disabled ~ ${container__slider}:before`, {
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
});

globalStyle(`${container} input:disabled ~ ${container__slider}:hover:before`, {
  // Reset background color
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
});

// Checked + disabled: keep non-interactive border color
globalStyle(`${container} input:checked:disabled ~ ${container__slider}`, {
  borderColor: varsThemeBase.colors.neutral.surfaceDisabled,
});
