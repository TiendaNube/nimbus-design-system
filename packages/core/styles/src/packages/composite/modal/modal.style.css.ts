import { style } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

export const overlay = style({
  display: "flex",
  height: "100vh",
  width: "100vw",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 100,
});

export const container = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "3rem",
  justifyContent: "center",
  flexWrap: "nowrap",
  height: "auto",

  backgroundColor: varsThemeBase.colors.neutral.background,
  borderRadius: varsThemeBase.spacing[2],
  boxSizing: "border-box",
  zIndex: 200,
});

export const close = style({
  appearance: "none",
  borderStyle: "solid",
  borderColor: "transparent",
  borderWidth: 1,
  background: "transparent",
  cursor: "pointer",
  margin: 0,

  position: "absolute",
  top: 0,
  right: 0,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  padding: varsThemeBase.spacing[4],
  borderRadius: varsThemeBase.spacing[2],

  ":focus": {
    boxShadow: varsThemeBase.utils.focus,
  },
  ":hover": {
    backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  },
  ":active": {
    backgroundColor: varsThemeBase.colors.neutral.interactivePressed,
  },
});

export const header = style({
  marginBottom: "1.125rem",
});

export const body = style({
  marginBottom: "1rem",
});

export const footer = style({
  display: "flex",
  gap: varsThemeBase.spacing[2],
  justifyContent: "flex-end",
});
