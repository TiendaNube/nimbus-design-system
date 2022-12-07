import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes/base.css";

const base = vanillaStyle({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  position: "relative",

  width: "100%",

  borderStyle: "solid",
  borderWidth: 1,

  paddingBottom: varsThemeBase.spacing[4],
  paddingLeft: varsThemeBase.spacing[4],
  paddingRight: varsThemeBase.spacing[12],
  paddingTop: varsThemeBase.spacing[4],
  boxSizing: "border-box",
  borderRadius: varsThemeBase.spacing[2],
  gap: varsThemeBase.spacing[4],
});

export const appearance = styleVariants({
  primary: [
    base,
    {
      backgroundColor: varsThemeBase.colors.primary.surface,
      borderColor: varsThemeBase.colors.primary.surfaceHighlight,
      color: varsThemeBase.colors.primary.textLow,
    },
  ],
  success: [
    base,
    {
      backgroundColor: varsThemeBase.colors.success.surface,
      borderColor: varsThemeBase.colors.success.surfaceHighlight,
      color: varsThemeBase.colors.success.textLow,
    },
  ],
  warning: [
    base,
    {
      backgroundColor: varsThemeBase.colors.warning.surface,
      borderColor: varsThemeBase.colors.warning.surfaceHighlight,
      color: varsThemeBase.colors.warning.textLow,
    },
  ],
  danger: [
    base,
    {
      backgroundColor: varsThemeBase.colors.danger.surface,
      borderColor: varsThemeBase.colors.danger.surfaceHighlight,
      color: varsThemeBase.colors.danger.textLow,
    },
  ],
  neutral: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.surface,
      borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
      color: varsThemeBase.colors.neutral.textLow,
    },
  ],
});

export const body = vanillaStyle({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: varsThemeBase.spacing[2],
});

export const content = vanillaStyle({
  display: "flex",
  flexDirection: "column",
  gap: varsThemeBase.spacing[4],

  lineHeight: varsThemeBase.lineWeight.body.base,
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.centranube,
});

export const close = vanillaStyle({
  appearance: "none",
  borderStyle: "solid",
  borderColor: "transparent",
  borderWidth: 1,
  background: "transparent",
  cursor: "pointer",
  margin: 0,

  position: "absolute",
  top: 0,
  right: 0,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  padding: varsThemeBase.spacing[4],
  borderRadius: varsThemeBase.spacing[2],

  transition: `all ${varsThemeBase.motion.speed.base}`,

  ":focus-visible": {
    boxShadow: `0px 0px 0px 3px ${varsThemeBase.colors.primary.surfaceHighlight}`,
  },
});

export const closeAppearance = styleVariants({
  primary: [
    close,
    {
      ":hover": {
        backgroundColor: varsThemeBase.colors.primary.surfaceHighlight,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactivePressed,
      },
    },
  ],
  success: [
    close,
    {
      ":hover": {
        backgroundColor: varsThemeBase.colors.success.surfaceHighlight,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.success.interactivePressed,
      },
    },
  ],
  warning: [
    close,
    {
      ":hover": {
        backgroundColor: varsThemeBase.colors.warning.surfaceHighlight,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.warning.interactivePressed,
      },
    },
  ],
  danger: [
    close,
    {
      ":hover": {
        backgroundColor: varsThemeBase.colors.danger.surfaceHighlight,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.danger.interactivePressed,
      },
    },
  ],
  neutral: [
    close,
    {
      ":hover": {
        backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.neutral.interactivePressed,
      },
    },
  ],
});