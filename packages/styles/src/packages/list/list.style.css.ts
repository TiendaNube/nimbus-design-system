import { style as vanillaStyle } from "@vanilla-extract/css";

import { varsThemeBase } from "../../themes/base.css";

export const container = vanillaStyle({
  display: "flex",
  flexDirection: "column",
  gap: varsThemeBase.spacing[1],
  margin: "0",
  paddingInlineStart: varsThemeBase.spacing[6],
});

export const item = vanillaStyle({
  lineHeight: varsThemeBase.lineWeight.body.base,
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.centranube,

  color: varsThemeBase.colors.neutral.textLow,

  position: "relative",

  selectors: {
    "&::marker": {
      color: varsThemeBase.colors.neutral.surfaceHighlight,
    },
  },
});

export const skeleton = vanillaStyle({
  display: "flex",
  flexDirection: "column",
  gap: varsThemeBase.spacing[1],
});
