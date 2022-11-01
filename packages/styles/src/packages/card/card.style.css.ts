import { style } from "@vanilla-extract/css";

import { varsThemeBase } from "../../themes/base.css";

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

export const skeleton = style({
  display: "flex",
});
