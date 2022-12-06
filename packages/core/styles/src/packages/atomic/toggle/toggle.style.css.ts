import { style as vanillaStyle, globalStyle } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes/base.css";

export const container = vanillaStyle({
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  gap: varsThemeBase.spacing[1],
  position: "relative",
  cursor: "pointer",
});

export const input = vanillaStyle({
  position: "absolute",
  overflow: "hidden",
  opacity: 0,
  height: 0,
  width: 0,
});

export const slider = vanillaStyle({
  width: "2rem",
  height: "1rem",
  display: "flex",

  alignItems: "center",
  justifyContent: "center",
  position: "relative",

  borderRadius: varsThemeBase.sizes[2],
  backgroundColor: varsThemeBase.colors.neutral.interactive,
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  ":before": {
    content: "",
    position: "absolute",
    width: "0.875rem",
    height: "0.875rem",

    backgroundColor: varsThemeBase.colors.neutral.background,
    borderRadius: "50%",
    left: "0.063rem",
    transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  },
});

globalStyle(`${container} input:checked ~ ${slider}`, {
  backgroundColor: varsThemeBase.colors.primary.interactive,
});

globalStyle(`${container} input:checked ~ ${slider}:before`, {
  left: "1.063rem",
});
