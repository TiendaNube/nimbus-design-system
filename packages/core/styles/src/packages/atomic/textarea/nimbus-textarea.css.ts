import { style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";
import { gradients, createBorderGradient } from "../../../gradients";
import { thinScrollbar } from "../../../utils/scrollbar.css";

// CSS custom properties for consistent height calculations
const textareaHeightVars = style({
  vars: {
    "--textarea-padding": varsThemeBase.spacing[2],
    "--textarea-border-width": varsThemeBase.shape.border.width[1],
    "--textarea-vertical-padding": `calc(var(--textarea-padding) * 2)`,
    "--textarea-vertical-borders": `calc(var(--textarea-border-width) * 2)`,
  },
});

const base = style([
  textareaHeightVars,
  thinScrollbar,
  {
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
    borderRadius: varsThemeBase.shape.border.radius.base,
    padding: "var(--textarea-padding)",
    transition: `all ${varsThemeBase.motion.speed.fast} ease`,
    "::placeholder": {
      color: varsThemeBase.colors.neutral.textLow,
    },
    ":disabled": {
      border: `var(--textarea-border-width) solid ${varsThemeBase.colors.neutral.interactive}`,
      backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
      color: varsThemeBase.colors.neutral.textDisabled,
      cursor: "not-allowed",
    },
  },
]);

export const appearance = styleVariants({
  neutral: [
    base,
    {
      border: `var(--textarea-border-width) solid ${varsThemeBase.colors.neutral.interactive}`,
      backgroundColor: varsThemeBase.colors.neutral.background,
      selectors: {
        "&:hover:not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
          borderColor: varsThemeBase.colors.neutral.interactiveHover,
        },
        "&:focus:not(:disabled)": {
          borderColor: varsThemeBase.colors.neutral.interactivePressed,
          boxShadow: `0 0 0 2px ${varsThemeBase.colors.neutral.interactive}`,
        },
      },
    },
  ],
  success: [
    base,
    {
      border: `var(--textarea-border-width) solid ${varsThemeBase.colors.success.interactive}`,
      backgroundColor: varsThemeBase.colors.neutral.background,
      selectors: {
        "&:not(:placeholder-shown):not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
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
      },
    },
  ],
  warning: [
    base,
    {
      border: `var(--textarea-border-width) solid ${varsThemeBase.colors.warning.interactive}`,
      backgroundColor: varsThemeBase.colors.neutral.background,
      selectors: {
        "&:not(:placeholder-shown):not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
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
      },
    },
  ],
  danger: [
    base,
    {
      border: `var(--textarea-border-width) solid ${varsThemeBase.colors.danger.interactive}`,
      backgroundColor: varsThemeBase.colors.neutral.background,
      selectors: {
        "&:not(:placeholder-shown):not(:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
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
      },
    },
  ],
  "ai-generative": [
    base,
    {
      background: createBorderGradient(
        gradients.aiGenerativeInteractive,
        varsThemeBase.colors.neutral.background
      ),
      borderWidth: "var(--textarea-border-width)",
      borderStyle: "solid",
      borderColor: "transparent",
      selectors: {
        "&:focus:not(:disabled)": {
          boxShadow: `0 0 0 2px ${varsThemeBase.colors.aiGenerative.interactive}`,
        },
      },
    },
  ],
  transparent: [
    base,
    {
      border: "none",
      backgroundColor: varsThemeBase.colors.neutral.background,
      selectors: {
        "&:focus": {
          borderColor: "transparent",
          boxShadow: "none",
        },
      },
      "::placeholder": {
        color: varsThemeBase.colors.neutral.textDisabled,
      },
    },
  ],
});

export const fieldSizing = style({
  fieldSizing: "content",
} as any);

export const resize = styleVariants({
  enabled: {
    resize: "both",
  },
  disabled: {
    resize: "none",
  },
});

export const aiGenerated = style([
  appearance["ai-generative"],
  {
    boxShadow: varsThemeBase.utils.aiFocus,
    selectors: {
      "&:focus:not(:disabled)": {
        boxShadow: `0 0 0 2px ${varsThemeBase.colors.aiGenerative.interactive}`,
      },
      "&:disabled": {
        boxShadow: "none",
      },
    },
  },
]);
