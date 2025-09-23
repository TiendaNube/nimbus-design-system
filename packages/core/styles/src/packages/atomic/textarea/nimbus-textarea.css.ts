import { style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";
import { gradients, createBorderGradient } from "../../../gradients";

// CSS custom properties for consistent padding and border calculations
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
    borderRadius: varsThemeBase.shape.border.radius[2],
    padding: "var(--textarea-padding)",
    transition: `all ${varsThemeBase.motion.speed.fast} ease`,
    "::placeholder": {
      color: varsThemeBase.colors.neutral.textLow,
    },
    ":disabled": {
      border: `var(--textarea-border-width) solid ${varsThemeBase.colors.neutral.surfaceHighlight}`,
      backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
      color: varsThemeBase.colors.neutral.textDisabled,
      cursor: "not-allowed",
    },
    ":focus-visible": {
      boxShadow: varsThemeBase.utils.focus,
    },
  },
]);

export const appearance = styleVariants({
  neutral: [
    base,
    {
      border: `var(--textarea-border-width) solid ${varsThemeBase.colors.neutral.interactive}`,
      backgroundColor: varsThemeBase.colors.neutral.background,
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactivePressed,
      },
    },
  ],
  success: [
    base,
    {
      border: `var(--textarea-border-width) solid ${varsThemeBase.colors.success.interactive}`,
      backgroundColor: varsThemeBase.colors.success.surface,
      ":focus": {
        borderColor: varsThemeBase.colors.success.interactivePressed,
      },
    },
  ],
  warning: [
    base,
    {
      border: `var(--textarea-border-width) solid ${varsThemeBase.colors.warning.interactive}`,
      backgroundColor: varsThemeBase.colors.warning.surface,
      ":focus": {
        borderColor: varsThemeBase.colors.warning.interactivePressed,
      },
    },
  ],
  danger: [
    base,
    {
      border: `var(--textarea-border-width) solid ${varsThemeBase.colors.danger.interactive}`,
      backgroundColor: varsThemeBase.colors.danger.surface,
      ":focus": {
        borderColor: varsThemeBase.colors.danger.interactivePressed,
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
    },
  ],
  transparent: [
    base,
    {
      border: "transparent",
      backgroundColor: varsThemeBase.colors.neutral.background,
      resize: "none",
      ":focus": {
        borderColor: "none",
        boxShadow: "none",
      },
      "::placeholder": {
        color: varsThemeBase.colors.neutral.textDisabled,
      },
    },
  ],
});

export const fieldSizing = style({
  fieldSizing: "content",
});
