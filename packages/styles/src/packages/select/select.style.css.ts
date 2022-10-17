import { globalStyle, style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../themes/base.css";

/* -------------------------------------------------------------------------------------------------
 * style as "base"
 * -----------------------------------------------------------------------------------------------*/

export const wrapper = style({
  position: "relative",
});

export const icon = style({
  position: "absolute",
  top: "50%",
  right: varsThemeBase.spacing[2],
  transform: "translateY(-50%)",
});

const base = style({
  fontFamily: varsThemeBase.fontFamily.centranube,
  fontSize: varsThemeBase.fontSize.body.base,
  lineHeight: varsThemeBase.lineWeight.body.base,
  textAlign: "left",

  color: varsThemeBase.colors.neutral.textHigh,

  borderRadius: varsThemeBase.sizes[2],
  paddingBottom: varsThemeBase.sizes[2],
  paddingLeft: varsThemeBase.sizes[2],
  paddingRight: varsThemeBase.sizes[8],
  paddingTop: varsThemeBase.sizes[2],
  width: "100%",

  appearance: "none",
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,

  "::placeholder": {
    color: varsThemeBase.colors.neutral.textDisabled,
  },

  ":disabled": {
    backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
    color: varsThemeBase.colors.neutral.textDisabled,

    cursor: "not-allowed",
  },

  ":focus": {
    borderColor: varsThemeBase.colors.primary.interactive,
  },
});

export const appearance = styleVariants({
  neutral: [
    base,
    {
      border: `1px solid ${varsThemeBase.colors.neutral.interactive}`,
      backgroundColor: varsThemeBase.colors.neutral.background,
    },
  ],
  success: [
    base,
    {
      border: `1px solid ${varsThemeBase.colors.success.interactive}`,
      backgroundColor: varsThemeBase.colors.success.surface,
    },
  ],
  warning: [
    base,
    {
      border: `1px solid ${varsThemeBase.colors.warning.interactive}`,
      backgroundColor: varsThemeBase.colors.warning.surface,
    },
  ],
  danger: [
    base,
    {
      border: `1px solid ${varsThemeBase.colors.danger.interactive}`,
      backgroundColor: varsThemeBase.colors.danger.surface,
    },
  ],
});

globalStyle(`${base} option`, {
  color: varsThemeBase.colors.neutral.textHigh,
});

globalStyle(`${base} option[value=""][disabled]`, {
  color: varsThemeBase.colors.neutral.textDisabled,
});
