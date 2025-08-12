import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

const base = vanillaStyle({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: "2rem",
  width: "fit-content",
  boxSizing: "border-box",
  gap: varsThemeBase.spacing[1],
  padding: varsThemeBase.spacing[2],
  borderRadius: varsThemeBase.shape.border.radius[2],
  transition: `${varsThemeBase.motion.speed.fast} ease`,
  zIndex: varsThemeBase.zIndex[800],
});

export const container = vanillaStyle({
  display: "flex",
  alignItems: "center",
  position: "fixed",
  bottom: "2rem",
  flexDirection: "column-reverse",
  left: 0,
  right: 0,
});

export const appearance = styleVariants({
  primary: [
    base,
    {
      background: varsThemeBase.colors.primary.textLow,
    },
  ],
  success: [
    base,
    {
      background: varsThemeBase.colors.success.textLow,
    },
  ],
  danger: [
    base,
    {
      background: varsThemeBase.colors.danger.textLow,
    },
  ],
  progress: [
    base,
    {
      background: varsThemeBase.colors.neutral.textHigh,
    },
  ],
});
