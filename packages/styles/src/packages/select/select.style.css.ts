import { globalStyle, style } from "@vanilla-extract/css";

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

export const field = style({
  fontFamily: varsThemeBase.fontFamily.centranube,
  fontSize: varsThemeBase.fontSize.body.base,
  lineHeight: varsThemeBase.lineWeight.body.base,
  textAlign: "left",

  border: `1px solid ${varsThemeBase.colors.neutral.interactive}`,
  borderRadius: varsThemeBase.sizes[2],
  paddingBottom: varsThemeBase.sizes[2],
  paddingLeft: varsThemeBase.sizes[2],
  paddingRight: varsThemeBase.sizes[8],
  paddingTop: varsThemeBase.sizes[2],
  width: "100%",

  backgroundColor: varsThemeBase.colors.neutral.background,
  color: varsThemeBase.colors.neutral.textHigh,

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

globalStyle(`${field} option`, {
  color: varsThemeBase.colors.neutral.textHigh,
});

globalStyle(`${field} option[value=""][disabled]`, {
  color: varsThemeBase.colors.neutral.textDisabled,
});
