import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

const base = vanillaStyle({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  padding: `${varsThemeBase.spacing[2]} ${varsThemeBase.spacing[4]}`,
  height: "2.125rem",
  width: "fit-content",
  gap: varsThemeBase.spacing[1],

  fontWeight: varsThemeBase.fontWeight.medium,
  lineHeight: varsThemeBase.lineWeight.body.base,
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.centranube,

  color: varsThemeBase.colors.neutral.textLow,
  borderRadius: "0.5rem",
  boxSizing: "border-box",

  borderWidth: "0.063rem",
  borderStyle: "solid",
  borderColor: varsThemeBase.colors.neutral.interactive,

  cursor: "pointer",
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  ":disabled": {
    color: varsThemeBase.colors.neutral.textDisabled,
    cursor: "not-allowed",
  },
  ":focus": {
    boxShadow: varsThemeBase.utils.focus,
  },
});

export const appearance = styleVariants({
  primary: [
    base,
    {
      background: varsThemeBase.colors.primary.interactive,
      borderColor: varsThemeBase.colors.primary.interactive,
      color: varsThemeBase.colors.neutral.background,
      ":hover": {
        background: varsThemeBase.colors.primary.interactiveHover,
        borderColor: varsThemeBase.colors.primary.interactiveHover,
      },
      ":active": {
        background: varsThemeBase.colors.primary.interactivePressed,
        borderColor: varsThemeBase.colors.primary.interactivePressed,
      },
      ":disabled": {
        background: varsThemeBase.colors.neutral.surfaceDisabled,
        borderColor: varsThemeBase.colors.primary.surfaceHighlight,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactiveHover,
      },
    },
  ],
  danger: [
    base,
    {
      background: varsThemeBase.colors.danger.interactive,
      borderColor: varsThemeBase.colors.danger.interactive,
      color: varsThemeBase.colors.neutral.background,
      ":hover": {
        background: varsThemeBase.colors.danger.interactiveHover,
        borderColor: varsThemeBase.colors.danger.interactiveHover,
      },
      ":active": {
        background: varsThemeBase.colors.danger.interactivePressed,
        borderColor: varsThemeBase.colors.danger.interactivePressed,
      },
      ":disabled": {
        background: varsThemeBase.colors.neutral.surfaceDisabled,
        borderColor: varsThemeBase.colors.danger.surfaceHighlight,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.danger.interactiveHover,
      },
    },
  ],
  neutral: [
    base,
    {
      background: varsThemeBase.colors.neutral.surface,
      borderColor: varsThemeBase.colors.neutral.interactive,
      color: varsThemeBase.colors.neutral.textLow,
      ":hover": {
        backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
        borderColor: varsThemeBase.colors.neutral.interactiveHover,
      },
      ":active": {
        backgroundColor: varsThemeBase.colors.neutral.interactive,
        borderColor: varsThemeBase.colors.neutral.interactivePressed,
      },
      ":disabled": {
        background: varsThemeBase.colors.neutral.surfaceDisabled,
        borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactive,
      },
    },
  ],
  transparent: [
    base,
    {
      background: "transparent",
      borderColor: "transparent",
      color: varsThemeBase.colors.neutral.textLow,
      ":hover": {
        backgroundColor: varsThemeBase.colors.neutral.surface,
        borderColor: varsThemeBase.colors.neutral.interactiveHover,
      },
      ":active": {
        backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
        borderColor: varsThemeBase.colors.neutral.interactivePressed,
      },
    },
  ],
});
