import { style as vanillaStyle } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

export const base = vanillaStyle({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",

  padding: `${varsThemeBase.spacing[1]} ${varsThemeBase.spacing[2]}`,
  gap: varsThemeBase.spacing[1],
  height: "1.5rem",
  width: "fit-content",
  boxSizing: "border-box",

  lineHeight: varsThemeBase.lineWeight.body.caption,
  fontSize: varsThemeBase.fontSize.body.caption,
  fontFamily: varsThemeBase.fontFamily.sans,
  background: varsThemeBase.colors.neutral.surface,
  color: varsThemeBase.colors.neutral.textLow,

  borderStyle: "solid",
  borderRadius: varsThemeBase.shape.border.radius[1],
  borderWidth: varsThemeBase.shape.border.width[1],
  borderColor: varsThemeBase.colors.neutral.interactive,
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
