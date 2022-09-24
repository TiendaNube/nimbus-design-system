import { style as vanillaStyle, globalStyle } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { varsThemeBase } from "../../themes/base.css";

const { spacing } = tokens;

export const container = vanillaStyle({
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  gap: spacing["05"].value,
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
  width: "1rem",
  height: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",

  borderWidth: "0.063rem",
  borderStyle: "solid",
  borderRadius: spacing["05"].value,
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
