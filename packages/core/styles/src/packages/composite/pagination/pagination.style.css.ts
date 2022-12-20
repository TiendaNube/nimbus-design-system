import { style as vanillaStyle } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

export const container = vanillaStyle({
  display: "flex",
  listStyleType: "none",
  padding: 0,
  gap: varsThemeBase.spacing[1],
});
