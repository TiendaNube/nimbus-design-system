import { style as vanillaStyle } from "@vanilla-extract/css";
import { varsThemeBase } from "../../themes/base.css";

export const container = vanillaStyle({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  borderRadius: "100%",

  borderWidth: "0.063rem",
  borderStyle: "solid",
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  ":active": {
    backgroundColor: varsThemeBase.colors.neutral.interactivePressed,
    borderColor: varsThemeBase.colors.neutral.interactivePressed,
  },
});
