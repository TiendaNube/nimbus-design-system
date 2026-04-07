import { globalStyle, style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

/** Total control height including border (28px at default 16px root; matches Input compact row). */
const SELECT_BORDER_BOX_HEIGHT = "1.75rem";

/**
 * Vertical padding inside the 28px border box after `line.height.body.caption` (1rem) and 1px borders.
 * Native `<select>` often ignores `calc()` with theme vars or keeps UA padding; use an explicit rem value.
 * Math: (1.75rem − 1rem − 2×border.width[1]) / 2 = 0.3125rem (~5px).
 */
const SELECT_VERTICAL_PADDING = "0.3125rem";

export const container = style({
  position: "relative",
});

export const container__icon = style({
  position: "absolute",
  top: "50%",
  right: varsThemeBase.spacing[2],
  transform: "translateY(-50%)",
  pointerEvents: "none",
});

const base = style({
  fontFamily: varsThemeBase.fontFamily.sans,
  fontSize: varsThemeBase.fontSize.body.base,
  lineHeight: varsThemeBase.lineWeight.body.caption,
  textAlign: "left",
  boxSizing: "border-box",
  color: varsThemeBase.colors.neutral.textHigh,
  borderRadius: varsThemeBase.shape.border.radius.base,
  margin: 0,
  height: SELECT_BORDER_BOX_HEIGHT,
  minHeight: SELECT_BORDER_BOX_HEIGHT,
  maxHeight: SELECT_BORDER_BOX_HEIGHT,
  padding: 0,
  paddingBottom: SELECT_VERTICAL_PADDING,
  paddingLeft: varsThemeBase.spacing[2],
  paddingRight: varsThemeBase.spacing[8],
  paddingTop: SELECT_VERTICAL_PADDING,
  width: "100%",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  outline: "none",
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  "::placeholder": {
    color: varsThemeBase.colors.neutral.textLow,
  },
});

export const appearance = styleVariants({
  neutral: [
    base,
    {
      border: `1px solid ${varsThemeBase.colors.neutral.interactive}`,
      backgroundColor: varsThemeBase.colors.neutral.background,
      color: varsThemeBase.colors.neutral.textHigh,
      selectors: {
        "&:has(option:checked:disabled):not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
          borderColor: varsThemeBase.colors.neutral.interactive,
          color: varsThemeBase.colors.neutral.textDisabled,
        },
        "&:hover:not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
          borderColor: varsThemeBase.colors.neutral.interactiveHover,
        },
        "&:focus:not(:disabled)": {
          borderColor: varsThemeBase.colors.neutral.interactivePressed,
          boxShadow: `0 0 0 2px ${varsThemeBase.colors.neutral.interactive}`,
        },
        "&:disabled": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
          borderColor: varsThemeBase.colors.neutral.interactive,
          color: varsThemeBase.colors.neutral.textDisabled,
          cursor: "not-allowed",
          boxShadow: "none",
        },
      },
    },
  ],
  success: [
    base,
    {
      border: `1px solid ${varsThemeBase.colors.success.interactive}`,
      backgroundColor: varsThemeBase.colors.neutral.background,
      color: varsThemeBase.colors.neutral.textHigh,
      selectors: {
        "&:not(:has(option:checked:disabled)):not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
          borderColor: varsThemeBase.colors.success.interactive,
          color: varsThemeBase.colors.neutral.textHigh,
        },
        "&:has(option:checked:disabled):not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.background,
          borderColor: varsThemeBase.colors.success.interactive,
          color: varsThemeBase.colors.neutral.textLow,
        },
        "&:hover:not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
          borderColor: varsThemeBase.colors.success.interactiveHover,
        },
        "&:focus:not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.background,
          borderColor: varsThemeBase.colors.success.interactiveHover,
          boxShadow: `0 0 0 2px ${varsThemeBase.colors.success.interactive}`,
        },
        "&:disabled": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
          borderColor: varsThemeBase.colors.neutral.interactive,
          color: varsThemeBase.colors.neutral.textDisabled,
          cursor: "not-allowed",
          boxShadow: "none",
        },
      },
    },
  ],
  warning: [
    base,
    {
      border: `1px solid ${varsThemeBase.colors.warning.interactive}`,
      backgroundColor: varsThemeBase.colors.neutral.background,
      color: varsThemeBase.colors.neutral.textHigh,
      selectors: {
        "&:not(:has(option:checked:disabled)):not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
          borderColor: varsThemeBase.colors.warning.interactive,
          color: varsThemeBase.colors.neutral.textHigh,
        },
        "&:has(option:checked:disabled):not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.background,
          borderColor: varsThemeBase.colors.warning.interactive,
          color: varsThemeBase.colors.neutral.textLow,
        },
        "&:hover:not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
          borderColor: varsThemeBase.colors.warning.interactiveHover,
        },
        "&:focus:not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.background,
          borderColor: varsThemeBase.colors.warning.interactiveHover,
          boxShadow: `0 0 0 2px ${varsThemeBase.colors.warning.interactive}`,
        },
        "&:disabled": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
          borderColor: varsThemeBase.colors.neutral.interactive,
          color: varsThemeBase.colors.neutral.textDisabled,
          cursor: "not-allowed",
          boxShadow: "none",
        },
      },
    },
  ],
  danger: [
    base,
    {
      border: `1px solid ${varsThemeBase.colors.danger.interactive}`,
      backgroundColor: varsThemeBase.colors.neutral.background,
      color: varsThemeBase.colors.neutral.textHigh,
      selectors: {
        "&:not(:has(option:checked:disabled)):not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
          borderColor: varsThemeBase.colors.danger.interactive,
          color: varsThemeBase.colors.neutral.textHigh,
        },
        "&:has(option:checked:disabled):not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.background,
          borderColor: varsThemeBase.colors.danger.interactive,
          color: varsThemeBase.colors.neutral.textLow,
        },
        "&:hover:not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
          borderColor: varsThemeBase.colors.danger.interactiveHover,
        },
        "&:focus:not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.background,
          borderColor: varsThemeBase.colors.danger.interactiveHover,
          boxShadow: `0 0 0 2px ${varsThemeBase.colors.danger.interactive}`,
        },
        "&:disabled": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
          borderColor: varsThemeBase.colors.neutral.interactive,
          color: varsThemeBase.colors.neutral.textDisabled,
          cursor: "not-allowed",
          boxShadow: "none",
        },
      },
    },
  ],
  "ai-generative": [
    base,
    {
      border: `1px solid ${varsThemeBase.colors.aiGenerative.textLow}`,
      backgroundColor: varsThemeBase.colors.neutral.background,
      color: varsThemeBase.colors.neutral.textHigh,
      selectors: {
        "&:not(:has(option:checked:disabled)):not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
          borderColor: varsThemeBase.colors.aiGenerative.textLow,
          color: varsThemeBase.colors.neutral.textHigh,
        },
        "&:has(option:checked:disabled):not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.background,
          borderColor: varsThemeBase.colors.aiGenerative.textLow,
          color: varsThemeBase.colors.neutral.textLow,
        },
        "&:hover:not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
          borderColor: varsThemeBase.colors.aiGenerative.textLow,
        },
        "&:focus:not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.background,
          borderColor: varsThemeBase.colors.aiGenerative.textLow,
          boxShadow: `0 0 0 2px ${varsThemeBase.colors.aiGenerative.interactive}`,
        },
        "&:disabled": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
          borderColor: varsThemeBase.colors.neutral.interactive,
          color: varsThemeBase.colors.neutral.textDisabled,
          cursor: "not-allowed",
          boxShadow: "none",
        },
      },
    },
  ],
});

globalStyle(`${base} option`, {
  color: varsThemeBase.colors.neutral.textHigh,
});

globalStyle(`${base} option[value=""][disabled]`, {
  color: varsThemeBase.colors.neutral.textDisabled,
});

export const aiGenerated = style([
  appearance["ai-generative"],
  {
    boxShadow: varsThemeBase.utils.aiFocus,
    selectors: {
      "&:disabled": {
        boxShadow: "none",
      },
    },
  },
]);
