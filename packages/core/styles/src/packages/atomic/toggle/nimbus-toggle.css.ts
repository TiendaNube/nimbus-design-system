import { style as vanillaStyle, globalStyle } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

export const container = vanillaStyle({
  borderRadius: "9px",
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  gap: varsThemeBase.spacing[1],
  position: "relative",
  cursor: "pointer",

  ":focus-within": {
    boxShadow: varsThemeBase.utils.focus,
  },
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

  borderRadius: "9px",
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: varsThemeBase.colors.neutral.interactive,
  backgroundColor: varsThemeBase.colors.neutral.surface,
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  ":before": {
    content: "",
    position: "absolute",
    width: "0.875rem",
    height: "0.875rem",

    backgroundColor: varsThemeBase.colors.neutral.interactive,
    borderRadius: "50%",
    left: "0.063rem",
    transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  },

  ":hover": {
    borderColor: varsThemeBase.colors.neutral.interactiveHover,
  },

  ":active": {
    borderColor: varsThemeBase.colors.neutral.interactivePressed,
  },
});

globalStyle(`${container} input:checked ~ ${container__slider}`, {
  borderColor: varsThemeBase.colors.primary.interactive,
});

globalStyle(`${container} input:checked ~ ${container__slider}:before`, {
  backgroundColor: varsThemeBase.colors.primary.interactive,
  left: "1.063rem",
});

globalStyle(`${container__slider}:hover:before`, {
  backgroundColor: varsThemeBase.colors.neutral.interactiveHover,
});

globalStyle(`${container__slider}:active:before`, {
  backgroundColor: varsThemeBase.colors.neutral.interactivePressed,
});

globalStyle(`${container} input:checked ~ ${container__slider}:hover:before`, {
  backgroundColor: varsThemeBase.colors.primary.interactiveHover,
});

globalStyle(`${container} input:checked ~ ${container__slider}:active:before`, {
  backgroundColor: varsThemeBase.colors.primary.interactivePressed,
});
