import { style } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

export const base = style({
  display: "flex",
  alignItems: "center",
  gap: varsThemeBase.spacing[1],

  lineHeight: varsThemeBase.lineWeight.body.caption,
  fontSize: varsThemeBase.fontSize.body.caption,
  fontFamily: varsThemeBase.fontFamily.centranube,

  color: varsThemeBase.colors.neutral.textLow,
});

export const hidden = style({
  border: "0",
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0",
  position: "absolute",
  width: "1px",
});
