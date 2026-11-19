import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

const base = vanillaStyle({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: "2rem",
  width: "fit-content",
  boxSizing: "border-box",
  gap: varsThemeBase.components.toast.gap,
  padding: varsThemeBase.spacing[2],
  paddingInlineEnd: varsThemeBase.components.toast.paddingInlineEnd,
  borderRadius: varsThemeBase.components.toast.borderRadius,
  boxShadow: varsThemeBase.components.toast.boxShadow,
  transition: `${varsThemeBase.motion.speed.fast} ease`,
  zIndex: varsThemeBase.zIndex[800],
});

const containerBase = vanillaStyle({
  display: "flex",
  alignItems: "center",
  position: "fixed",
  flexDirection: "column-reverse",
  left: 0,
  right: 0,
});

export const container = styleVariants({
  default: [
    containerBase,
    {
      bottom: varsThemeBase.spacing[8],
    },
  ],
  high: [
    containerBase,
    {
      bottom: `calc(env(safe-area-inset-bottom, 0px) + 5rem)`,
    },
  ],
});

export const appearance = styleVariants({
  primary: [
    base,
    {
      background: varsThemeBase.components.toast.primary.background,
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
