import { style as vanillaStyle } from "@vanilla-extract/css";
import { varsThemeBase } from "../../themes/base.css";

export const style = vanillaStyle({
  fontFamily: varsThemeBase.fontFamily.centranube,
  fontWeight: varsThemeBase.fontWeight.regular,
  margin: 0,
});
