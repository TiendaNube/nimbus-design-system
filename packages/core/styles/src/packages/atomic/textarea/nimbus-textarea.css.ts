import { style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

const base = style({
  width: "100%",
  appearance: "none",
  outline: "none",
  textAlign: "left",
  boxSizing: "border-box",
  margin: 0,
  fontFamily: varsThemeBase.fontFamily.sans,
  fontSize: varsThemeBase.fontSize.body.base,
  lineHeight: varsThemeBase.lineWeight.body.caption,
  color: varsThemeBase.colors.neutral.textHigh,
  borderRadius: varsThemeBase.shape.border.radius[2],
  paddingBottom: varsThemeBase.spacing[2],
  paddingLeft: varsThemeBase.spacing[2],
  paddingRight: varsThemeBase.spacing[2],
  paddingTop: varsThemeBase.spacing[2],
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  "::placeholder": {
    color: varsThemeBase.colors.neutral.textDisabled,
  },
  ":disabled": {
    border: `${varsThemeBase.shape.border.width[1]} solid ${varsThemeBase.colors.neutral.surfaceHighlight}`,
    backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
    color: varsThemeBase.colors.neutral.textDisabled,
    cursor: "not-allowed",
  },
  ":focus-visible": {
    boxShadow: varsThemeBase.utils.focus,
  },
});

export const appearance = styleVariants({
  neutral: [
    base,
    {
      border: `${varsThemeBase.shape.border.width[1]} solid ${varsThemeBase.colors.neutral.interactive}`,
      backgroundColor: varsThemeBase.colors.neutral.background,
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactivePressed,
      },
    },
  ],
  success: [
    base,
    {
      border: `${varsThemeBase.shape.border.width[1]} solid ${varsThemeBase.colors.success.interactive}`,
      backgroundColor: varsThemeBase.colors.success.surface,
      ":focus": {
        borderColor: varsThemeBase.colors.success.interactivePressed,
      },
    },
  ],
  warning: [
    base,
    {
      border: `${varsThemeBase.shape.border.width[1]} solid ${varsThemeBase.colors.warning.interactive}`,
      backgroundColor: varsThemeBase.colors.warning.surface,
      ":focus": {
        borderColor: varsThemeBase.colors.warning.interactivePressed,
      },
    },
  ],
  danger: [
    base,
    {
      border: `${varsThemeBase.shape.border.width[1]} solid ${varsThemeBase.colors.danger.interactive}`,
      backgroundColor: varsThemeBase.colors.danger.surface,
      ":focus": {
        borderColor: varsThemeBase.colors.danger.interactivePressed,
      },
    },
  ],
});
