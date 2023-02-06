import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

const base = vanillaStyle({
  alignItems: "center",
  appearance: "none",
  display: "inline-flex",
  gap: varsThemeBase.spacing[1],
  textAlign: "inherit",

  fontWeight: varsThemeBase.fontWeight.regular,
  borderRadius: varsThemeBase.spacing[1],
  fontFamily: varsThemeBase.fontFamily.centranube,
  cursor: "pointer",
  boxSizing: "border-box",

  transition: `all ${varsThemeBase.motion.speed.fast} ease`,

  backgroundColor: "transparent",
  border: 0,

  ":focus": {
    boxShadow: varsThemeBase.utils.focus,
  },
});

export const size = styleVariants({
  caption: {
    fontSize: varsThemeBase.fontSize.body.caption,
    lineHeight: varsThemeBase.lineWeight.body.caption,
  },
  base: {
    fontSize: varsThemeBase.fontSize.body.base,
    lineHeight: varsThemeBase.lineWeight.body.base,
  },
  highlight: {
    fontSize: varsThemeBase.fontSize.body.highlight,
    lineHeight: varsThemeBase.lineWeight.body.highlight,
  },
});

export const appearance = styleVariants({
  primary: [
    base,
    {
      color: varsThemeBase.colors.primary.interactive,
      ":hover": {
        color: varsThemeBase.colors.primary.interactiveHover,
      },
      ":active": {
        color: varsThemeBase.colors.primary.interactivePressed,
      },
    },
  ],
  danger: [
    base,
    {
      color: varsThemeBase.colors.danger.interactive,
      ":hover": {
        color: varsThemeBase.colors.danger.interactiveHover,
      },
      ":active": {
        color: varsThemeBase.colors.danger.interactivePressed,
      },
    },
  ],
  neutral: [
    base,
    {
      color: varsThemeBase.colors.neutral.textLow,
      ":hover": {
        color: varsThemeBase.colors.neutral.textDisabled,
      },
      ":active": {
        color: varsThemeBase.colors.neutral.textHigh,
      },
    },
  ],
  "neutral.background": [
    base,
    {
      color: varsThemeBase.colors.neutral.background,
      ":hover": {
        color: varsThemeBase.colors.neutral.surface,
      },
      ":active": {
        color: varsThemeBase.colors.neutral.surfaceDisabled,
      },
    },
  ],
});
