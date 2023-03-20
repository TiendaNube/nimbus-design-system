import { style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

const base = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "fit-content",
  height: "0.875rem", // 0.875rem - 14px
  minWidth: "0.875rem", // 0.875rem - 14px

  padding: `0 ${varsThemeBase.spacing[1]}`,
  boxSizing: "border-box",
  borderRadius: "0.75rem",

  lineHeight: varsThemeBase.lineWeight.body.caption,
  fontSize: varsThemeBase.fontSize.body.caption,
  fontFamily: varsThemeBase.fontFamily.centranube,
});

export const surface = styleVariants({
  primary: [
    base,
    {
      backgroundColor: varsThemeBase.colors.primary.textLow,
      color: varsThemeBase.colors.neutral.background,
    },
  ],
  success: [
    base,
    {
      backgroundColor: varsThemeBase.colors.success.textLow,
      color: varsThemeBase.colors.neutral.background,
    },
  ],
  warning: [
    base,
    {
      backgroundColor: varsThemeBase.colors.warning.textLow,
      color: varsThemeBase.colors.neutral.background,
    },
  ],
  danger: [
    base,
    {
      backgroundColor: varsThemeBase.colors.danger.textLow,
      color: varsThemeBase.colors.neutral.background,
    },
  ],
  neutral: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.textLow,
      color: varsThemeBase.colors.neutral.background,
    },
  ],
});

export const light = styleVariants({
  primary: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.background,
      color: varsThemeBase.colors.primary.textLow,
    },
  ],
  success: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.background,
      color: varsThemeBase.colors.success.textLow,
    },
  ],
  warning: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.background,
      color: varsThemeBase.colors.warning.textLow,
    },
  ],
  danger: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.background,
      color: varsThemeBase.colors.danger.textLow,
    },
  ],
  neutral: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.background,
      color: varsThemeBase.colors.neutral.textLow,
    },
  ],
});
