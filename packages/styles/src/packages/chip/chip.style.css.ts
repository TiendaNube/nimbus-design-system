import { style as vanillaStyle } from "@vanilla-extract/css";

import { varsThemeBase } from "../../themes/base.css";

export const style = vanillaStyle({
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

  background: varsThemeBase.colors.neutral.interactive,
  color: varsThemeBase.colors.neutral.textLow,
  borderRadius: "0.25rem",
  boxSizing: "border-box",

  borderWidth: "0.063rem",
  borderStyle: "solid",
  borderColor: varsThemeBase.colors.neutral.interactive,

  cursor: "pointer",
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,

  ":hover": {
    background: varsThemeBase.colors.neutral.interactiveHover,
    borderColor: varsThemeBase.colors.neutral.interactiveHover,
  },
  ":focus": {
    borderColor: varsThemeBase.colors.neutral.interactiveHover,
  },
  ":active": {
    background: varsThemeBase.colors.neutral.interactivePressed,
    borderColor: varsThemeBase.colors.neutral.interactivePressed,
  },
});
