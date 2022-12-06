import { style, styleVariants, globalStyle } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes/base.css";

/* -------------------------------------------------------------------------------------------------
 * style as "base"
 * -----------------------------------------------------------------------------------------------*/

export const container = style({
  position: "relative",
  display: "flex",
  alignItems: "flex-start",
  width: "fit-content",
  gap: varsThemeBase.spacing[1],
  borderWidth: "0.063rem",
  borderStyle: "solid",
  borderColor: "transparent",
  borderRadius: varsThemeBase.sizes[1],
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  ":focus": {
    borderColor: varsThemeBase.colors.neutral.interactiveHover,
  },
});

const base = style({
  display: "flex",
  padding: `${varsThemeBase.spacing[1]} ${varsThemeBase.sizes["1,5"]}`,
  borderRadius: varsThemeBase.sizes[1],
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
});

export const content = styleVariants({
  radio: [
    {
      transition: `all ${varsThemeBase.motion.speed.fast} ease`,
      display: "flex",
      color: varsThemeBase.colors.neutral.textLow,
    },
  ],
  button: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.interactive,
      color: varsThemeBase.colors.neutral.textLow,
      ":active": {
        background: varsThemeBase.colors.neutral.interactivePressed,
        color: varsThemeBase.colors.neutral.textHigh,
      },
      ":hover": {
        background: varsThemeBase.colors.neutral.interactiveHover,
      },
    },
  ],
  disabled: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
      color: varsThemeBase.colors.neutral.textDisabled,
    },
  ],
});

export const input = style({
  position: "absolute",
  overflow: "hidden",
  opacity: 0,
  height: 0,
  width: 0,
});

/* -------------------------------------------------------------------------------------------------
 * style as "radio"
 * -----------------------------------------------------------------------------------------------*/

export const checkmark = style({
  minWidth: "0.938rem",
  minHeight: "0.938rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",

  borderWidth: "0.063rem",
  borderStyle: "solid",
  borderRadius: varsThemeBase.sizes[3],
  borderColor: varsThemeBase.colors.neutral.interactive,
});

export const checkicon = style({
  display: "none",
  width: "0.563rem",
  height: "0.563rem",
  borderRadius: "0.563rem",
});

globalStyle(`${input}:checked ~ ${checkmark}`, {
  borderColor: varsThemeBase.colors.primary.interactive,
});

globalStyle(`${input}:checked ~ ${checkmark} ${checkicon}`, {
  display: "block",
  backgroundColor: varsThemeBase.colors.primary.interactive,
});

globalStyle(`${input}:disabled ~ ${checkmark}`, {
  backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
  borderColor: varsThemeBase.colors.neutral.interactive,
});

globalStyle(`${input}:disabled ~ ${checkmark} ${checkicon}`, {
  backgroundColor: varsThemeBase.colors.neutral.textDisabled,
});

/* -------------------------------------------------------------------------------------------------
 * style as "button"
 * -----------------------------------------------------------------------------------------------*/

globalStyle(`${input}:checked ~ ${content.button}`, {
  backgroundColor: varsThemeBase.colors.primary.interactive,
  color: varsThemeBase.colors.neutral.background,
});

globalStyle(`${input}:checked ~ ${content.disabled}`, {
  backgroundColor: varsThemeBase.colors.neutral.textDisabled,
  color: varsThemeBase.colors.neutral.background,
});
