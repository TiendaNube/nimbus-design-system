import { style } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

export const container = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "1.5rem",
  justifyContent: "center",

  borderRadius: varsThemeBase.spacing[2],
  boxShadow: varsThemeBase.shadow.card,
  boxSizing: "border-box",
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
});
