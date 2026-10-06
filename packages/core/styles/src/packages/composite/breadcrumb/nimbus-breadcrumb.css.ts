import { style as vanillaStyle } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

export const list = vanillaStyle({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: varsThemeBase.spacing[1],
  minWidth: 0,
  listStyleType: "none",
  margin: 0,
  padding: 0
});

export const item = vanillaStyle({
  display: "flex",
  alignItems: "center",
  gap: varsThemeBase.spacing[1],
  minWidth: 0,
  maxWidth: "100%"
});

export const label = vanillaStyle({
  minWidth: 0,
  overflowWrap: "anywhere",
  wordBreak: "break-word"
});

export const separator = vanillaStyle({
  display: "flex",
  flexShrink: 0,
  selectors: {
    '[dir="rtl"] &': {
      transform: "scaleX(-1)"
    }
  }
});

export const trigger = vanillaStyle({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  minWidth: "2rem",
  minHeight: "2rem",
  backgroundColor: "transparent"
});

export const panel = vanillaStyle({
  boxSizing: "border-box",
  backgroundColor: varsThemeBase.colors.neutral.background,
  borderRadius: varsThemeBase.shape.border.radius[3],
  boxShadow: varsThemeBase.shadow.level[2],
  zIndex: varsThemeBase.zIndex[800],
  padding: varsThemeBase.spacing[2]
});

export const panelList = vanillaStyle({
  display: "flex",
  flexDirection: "column",
  gap: varsThemeBase.spacing[2],
  listStyleType: "none",
  margin: 0,
  padding: 0
});
