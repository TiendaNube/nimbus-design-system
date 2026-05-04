import { style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

const baseDot = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "0.5rem", // 0.5rem - 8px
  height: "0.5rem", // 0.5rem - 8px

  boxSizing: "border-box",
  borderRadius: varsThemeBase.shape.border.radius.full,
});

export const dot = styleVariants({
  primary: [baseDot, { backgroundColor: varsThemeBase.colors.primary.interactive }],
  success: [baseDot, { backgroundColor: varsThemeBase.colors.success.interactive }],
  warning: [baseDot, { backgroundColor: varsThemeBase.colors.warning.interactive }],
  danger: [baseDot, { backgroundColor: varsThemeBase.colors.danger.interactive }],
  neutral: [baseDot, { backgroundColor: varsThemeBase.colors.neutral.interactive }],
});

const base = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "fit-content",
  height: "1rem", // 1rem - 16px
  minWidth: "1rem", // 1rem - 16px

  padding: `0 ${varsThemeBase.spacing[1]}`,
  boxSizing: "border-box",
  borderRadius: varsThemeBase.shape.border.radius["1"],

  lineHeight: varsThemeBase.lineWeight.body.caption,
  fontSize: varsThemeBase.fontSize.body.caption,
  fontFamily: varsThemeBase.fontFamily.sans,
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
