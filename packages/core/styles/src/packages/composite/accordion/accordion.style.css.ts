import { style } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

export const container = style({
  width: "100%",
  cursor: "pointer",

  backgroundColor: varsThemeBase.colors.neutral.background,
  padding: varsThemeBase.sizes[4],
  border: "none",
});

export const content = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const description = style({
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  gap: varsThemeBase.sizes["2,5"],
});

export const title = style({
  display: "flex",
  flexDirection: "column",
  gap: varsThemeBase.sizes[1],
});

export const active = style({
  backgroundColor: varsThemeBase.colors.neutral.surface,
});

export const body = style({
  width: "100%",
  cursor: "pointer",
  display: "flex",
  backgroundColor: varsThemeBase.colors.neutral.surface,
  boxSizing: "border-box",
  padding: varsThemeBase.sizes[4],
  paddingTop: 0,
  fontFamily: varsThemeBase.fontFamily.centranube,
});
