import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { varsThemeBase } from "../../themes/base.css";

const { spacing } = tokens;
const base = vanillaStyle({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: spacing["05"].value,

  height: "2rem",
  width: "fit-content",

  padding: spacing["1"].value,
  boxSizing: "border-box",

  borderWidth: "0.063rem",
  borderStyle: "solid",
  borderRadius: spacing["1"].value,

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
