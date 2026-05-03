import { style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

const base = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "fit-content",
  minWidth: "1rem", // 16px

  padding: `0 ${varsThemeBase.spacing[1]}`,
  boxSizing: "border-box",
  borderRadius: varsThemeBase.shape.border.radius[1],

  lineHeight: varsThemeBase.lineWeight.body.caption,
  fontSize: varsThemeBase.fontSize.body.caption,
  fontFamily: varsThemeBase.fontFamily.sans,
});

export const surface = styleVariants({
  primary: [
    base,
    {
      backgroundColor: varsThemeBase.colors.primary.interactive,
      color: varsThemeBase.colors.neutral.background,
    },
  ],
  success: [
    base,
    {
      backgroundColor: varsThemeBase.colors.success.interactivePressed,
      color: varsThemeBase.colors.neutral.background,
    },
  ],
  warning: [
    base,
    {
      backgroundColor: varsThemeBase.colors.warning.interactivePressed,
      color: varsThemeBase.colors.neutral.background,
    },
  ],
  danger: [
    base,
    {
      backgroundColor: varsThemeBase.colors.danger.interactivePressed,
      color: varsThemeBase.colors.neutral.background,
    },
  ],
  neutral: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.interactive,
      color: varsThemeBase.colors.neutral.textHigh,
    },
  ],
});

export const light = styleVariants({
  primary: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
      color: varsThemeBase.colors.primary.textLow,
    },
  ],
  success: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
      color: varsThemeBase.colors.success.textLow,
    },
  ],
  warning: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
      color: varsThemeBase.colors.warning.textLow,
    },
  ],
  danger: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
      color: varsThemeBase.colors.danger.textLow,
    },
  ],
  neutral: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
      color: varsThemeBase.colors.neutral.textLow,
    },
  ],
});

const DOT_SIZE = "0.75rem"; // 12px

const dotBase = style({
  width: DOT_SIZE,
  height: DOT_SIZE,
  flexShrink: 0,
  borderRadius: varsThemeBase.shape.border.radius.full,
});

export const dot = styleVariants({
  primary: [
    dotBase,
    { backgroundColor: varsThemeBase.colors.primary.interactive },
  ],
  success: [
    dotBase,
    { backgroundColor: varsThemeBase.colors.success.interactivePressed },
  ],
  warning: [
    dotBase,
    { backgroundColor: varsThemeBase.colors.warning.interactivePressed },
  ],
  danger: [
    dotBase,
    { backgroundColor: varsThemeBase.colors.danger.interactivePressed },
  ],
  neutral: [
    dotBase,
    { backgroundColor: varsThemeBase.colors.neutral.interactive },
  ],
});
