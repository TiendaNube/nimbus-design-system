import { style as vanillaStyle } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

export const container = vanillaStyle({
  fontFamily: varsThemeBase.fontFamily.centranube,
  fontWeight: varsThemeBase.fontWeight.regular,
  margin: 0,
});
