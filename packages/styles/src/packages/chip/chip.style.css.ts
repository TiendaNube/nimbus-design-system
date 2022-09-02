import { style as vanillaStyle } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { varsThemeBase } from "../../themes/base.css";

const { spacing } = tokens;

export const style = vanillaStyle({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  padding: `${spacing["05"].value} ${spacing["1"].value}`,
  height: "1.5rem",
  width: "fit-content",
  gap: spacing["05"].value,

  lineHeight: varsThemeBase.lineWeight.body.small,
  fontSize: varsThemeBase.fontSize.body.small,
  fontFamily: varsThemeBase.fontFamily.centranube,

  background: varsThemeBase.colors.neutral.interactive,
  color: varsThemeBase.colors.neutral.textLow,
  borderRadius: "0.25rem",
  boxSizing: "border-box",

  borderWidth: "0.063rem",
  borderStyle: "solid",
  borderColor: varsThemeBase.colors.neutral.interactive,

  cursor: "pointer",
  transition: "150ms ease",

  ":hover": {
    background: varsThemeBase.colors.neutral.interactiveHover,
    borderColor: varsThemeBase.colors.neutral.interactiveHover,
  },
  ":focus": {
    borderColor: varsThemeBase.colors.neutral.textLow,
  },
  ":active": {
    background: varsThemeBase.colors.neutral.interactivePressed,
    borderColor: varsThemeBase.colors.neutral.interactivePressed,
  },
});
