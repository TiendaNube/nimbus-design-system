import { style as vanillaStyle } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

export const base = vanillaStyle({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  padding: `${varsThemeBase.spacing[1]} ${varsThemeBase.spacing[2]}`,
  height: "1.5rem",
  width: "fit-content",
  gap: varsThemeBase.spacing[1],

  lineHeight: varsThemeBase.lineWeight.body.caption,
  fontSize: varsThemeBase.fontSize.body.caption,
  fontFamily: varsThemeBase.fontFamily.centranube,

  background: varsThemeBase.colors.neutral.surface,
  color: varsThemeBase.colors.neutral.textLow,
  borderRadius: "0.25rem",
  boxSizing: "border-box",

  borderWidth: "0.063rem",
  borderStyle: "solid",
  borderColor: varsThemeBase.colors.neutral.interactive,

  cursor: "pointer",
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,

  ":hover": {
    background: varsThemeBase.colors.neutral.surfaceHighlight,
    borderColor: varsThemeBase.colors.neutral.interactiveHover,
  },
  ":focus": {
    borderColor: varsThemeBase.colors.primary.interactive,
    boxShadow: varsThemeBase.utils.focus,
  },
  ":active": {
    background: varsThemeBase.colors.neutral.interactive,
    borderColor: varsThemeBase.colors.neutral.interactivePressed,
  },
});
