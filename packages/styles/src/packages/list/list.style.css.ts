import { style as vanillaStyle } from "@vanilla-extract/css";

import { varsThemeBase } from "../../themes/base.css";

const base = vanillaStyle({
  display: "flex",
  flexDirection: "column",
  gap: varsThemeBase.spacing[1],
  margin: "0",
  paddingInlineStart: varsThemeBase.spacing[6],
});

export const ul = vanillaStyle([
  base,
  {
    listStyle: "none",
  },
]);

export const ol = vanillaStyle([base]);

export const item = vanillaStyle({
  lineHeight: varsThemeBase.lineWeight.body.base,
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.centranube,

  color: varsThemeBase.colors.neutral.textLow,

  position: "relative",

  selectors: {
    [`${ul} &::before`]: {
      backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
      borderRadius: "100%",
      content: "",
      display: "block",
      height: varsThemeBase.spacing[1],
      left: "-16px",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: varsThemeBase.spacing[1],
    },
  },
});

export const skeleton = vanillaStyle({
  display: "flex",
  flexDirection: "column",
  gap: varsThemeBase.spacing[1],
});
