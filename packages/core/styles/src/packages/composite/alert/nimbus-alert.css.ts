import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

const base = vanillaStyle({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  position: "relative",
  width: "100%",
  borderStyle: "solid",
  borderWidth: 1,
  borderRadius: varsThemeBase.spacing[2],
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

export const container = vanillaStyle({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  paddingTop: varsThemeBase.spacing[4],
  paddingBottom: varsThemeBase.spacing[4],
  paddingLeft: varsThemeBase.spacing[4],
  paddingRight: varsThemeBase.spacing[4],
  boxSizing: "border-box",
  flex: 1,
  gap: varsThemeBase.spacing[4],
});

export const container__body = vanillaStyle({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: varsThemeBase.spacing[2],
});

export const container__content = vanillaStyle({
  display: "flex",
  flexDirection: "column",
  gap: varsThemeBase.spacing[4],
  lineHeight: varsThemeBase.lineWeight.body.base,
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.centranube,
});

const container__close = vanillaStyle({
  appearance: "none",
  borderStyle: "solid",
  borderColor: "transparent",
  borderWidth: 1,
  background: "transparent",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: varsThemeBase.spacing[4],
  borderRadius: varsThemeBase.spacing[2],
  transition: `all ${varsThemeBase.motion.speed.base}`,
  ":focus": {
    boxShadow: varsThemeBase.utils.focus,
  },
});

export const container__close_appearance = styleVariants({
  primary: [
    container__close,
    {
      ":hover": {
        backgroundColor: varsThemeBase.colors.primary.surfaceHighlight,
      },

      ":active": {
        backgroundColor: varsThemeBase.colors.primary.interactivePressed,
      },
    },
  ],
  success: [
    container__close,
    {
      ":hover": {
        backgroundColor: varsThemeBase.colors.success.surfaceHighlight,
      },

      ":active": {
        backgroundColor: varsThemeBase.colors.success.interactivePressed,
      },
    },
  ],
  warning: [
    container__close,
    {
      ":hover": {
        backgroundColor: varsThemeBase.colors.warning.surfaceHighlight,
      },

      ":active": {
        backgroundColor: varsThemeBase.colors.warning.interactivePressed,
      },
    },
  ],
  danger: [
    container__close,
    {
      ":hover": {
        backgroundColor: varsThemeBase.colors.danger.surfaceHighlight,
      },

      ":active": {
        backgroundColor: varsThemeBase.colors.danger.interactivePressed,
      },
    },
  ],
  neutral: [
    container__close,
    {
      ":hover": {
        backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
      },

      ":active": {
        backgroundColor: varsThemeBase.colors.neutral.interactivePressed,
      },
    },
  ],
});
