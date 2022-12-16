import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

const base = vanillaStyle({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: varsThemeBase.spacing[1],

  height: "2rem",
  width: "fit-content",

  padding: varsThemeBase.spacing[2],
  boxSizing: "border-box",

  borderRadius: varsThemeBase.spacing[2],

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
      background: varsThemeBase.colors.neutral.textLow,
    },
  ],
});
