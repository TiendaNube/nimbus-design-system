import { style as vanillaStyle, globalStyle } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes/base.css";

export const container = vanillaStyle({
  display: "flex",
  alignItems: "flex-start",
  width: "fit-content",
  gap: varsThemeBase.spacing[1],
  position: "relative",
});

export const input = vanillaStyle({
  position: "absolute",
  overflow: "hidden",
  opacity: 0,
  height: 0,
  width: 0,
});

export const checkmark = vanillaStyle({
  minWidth: "0.938rem",
  minHeight: "0.938rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",

  borderWidth: "0.063rem",
  borderStyle: "solid",
  borderRadius: varsThemeBase.spacing[1],
});

export const checkicon = vanillaStyle({
  display: "none",
});

export const checkindeterminate = vanillaStyle({
  display: "block",
});

globalStyle(`${container} input:checked ~ ${checkmark}`, {
  backgroundColor: varsThemeBase.colors.primary.interactive,
  borderColor: varsThemeBase.colors.primary.interactive,
});

globalStyle(`${container} input:disabled ~ ${checkmark}`, {
  backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
  borderColor: varsThemeBase.colors.neutral.interactive,
});

globalStyle(`${container} input:checked ~ ${checkmark} ${checkicon}`, {
  display: "block",
});

globalStyle(`${container} input:checked ~ ${checkmark} ${checkindeterminate}`, {
  display: "none",
});
