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

export const textDecoration = styleVariants({
  underline: {
    textDecoration: "underline",
  },
  none: {},
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
      ":focus": {
        outline: `${varsThemeBase.colors.primary.interactivePressed} auto 1px`,
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
      ":focus": {
        outline: `${varsThemeBase.colors.danger.interactivePressed} auto 1px`,
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
      ":focus": {
        outline: `${varsThemeBase.colors.neutral.textHigh} auto 1px`,
      },
    },
  ],
});
