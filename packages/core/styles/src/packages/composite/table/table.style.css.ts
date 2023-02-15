import { style } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

export const table = style({
  backgroundColor: varsThemeBase.colors.neutral.background,
  borderColor: varsThemeBase.colors.neutral.surface,
  color: varsThemeBase.colors.neutral.textHigh,
  boxShadow: varsThemeBase.shadow.card,

  borderCollapse: "collapse",
  borderRadius: varsThemeBase.spacing[2],
  borderSpacing: 0,
  fontFamily: varsThemeBase.fontFamily.centranube,
  overflow: "hidden",
  width: "100%",
});

export const head = style({
  backgroundColor: varsThemeBase.colors.neutral.surface,

  fontWeight: varsThemeBase.fontWeight.medium,
  fontSize: varsThemeBase.fontSize.body.base,
  lineHeight: varsThemeBase.lineWeight.body.base,
});

export const body = style({
  fontWeight: varsThemeBase.fontWeight.regular,
  fontSize: varsThemeBase.fontSize.body.base,
  lineHeight: varsThemeBase.lineWeight.body.base,
});

export const row = style({
  borderColor: varsThemeBase.colors.neutral.surface,

  borderStyle: "solid",
  borderWidth: "1px 0 1px 0",
  transition: `background-color ${varsThemeBase.motion.speed.fast} ease-in-out`,
});

export const cell = style({
  verticalAlign: "top",
});
