import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes/base.css";

const base = vanillaStyle({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: varsThemeBase.spacing[1],

  height: "2rem",
  width: "fit-content",

  padding: varsThemeBase.spacing[1],
  boxSizing: "border-box",

  borderWidth: "0.063rem",
  borderStyle: "solid",
  borderRadius: varsThemeBase.spacing[1],

  transition: `${varsThemeBase.motion.speed.fast} ease`,
});

export const wrapper = vanillaStyle({
  display: "flex",
  alignItems: "center",
  position: "fixed",
  bottom: "2rem",
  flexDirection: "column-reverse",
  left: 0,
  right: 0,
});

export const content = styleVariants({
  primary: [
    base,
    {
      background: varsThemeBase.colors.primary.surface,
      borderColor: varsThemeBase.colors.primary.surfaceHighlight,
    },
  ],
  success: [
    base,
    {
      background: varsThemeBase.colors.success.surface,
      borderColor: varsThemeBase.colors.success.surfaceHighlight,
    },
  ],
  danger: [
    base,
    {
      background: varsThemeBase.colors.danger.surface,
      borderColor: varsThemeBase.colors.danger.surfaceHighlight,
    },
  ],
  progress: [
    base,
    {
      background: varsThemeBase.colors.neutral.surface,
      borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
    },
  ],
});
