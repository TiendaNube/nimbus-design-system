import { style as vanillaStyle } from "@vanilla-extract/css";
import { varsThemeBase } from "../../themes/base.css";

export const style = vanillaStyle({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",

  width: varsThemeBase.sizes[8],
  height: varsThemeBase.sizes[8],
  borderRadius: varsThemeBase.sizes[5],

  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
  borderWidth: "0.063rem",
  borderStyle: "solid",

  transition: `all ${varsThemeBase.motion.speed.fast} ease`,

  ":hover": {
    backgroundColor: varsThemeBase.colors.neutral.interactive,
    borderColor: varsThemeBase.colors.neutral.interactive,
  },
  ":focus": {
    borderColor: varsThemeBase.colors.neutral.interactiveHover,
  },
  ":active": {
    background: varsThemeBase.colors.neutral.interactivePressed,
    borderColor: varsThemeBase.colors.neutral.interactivePressed,
  },
});
