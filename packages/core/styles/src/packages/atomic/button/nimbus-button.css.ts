import { style, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";
import {
  gradients,
  aiGenerativeHoverOverlay,
  aiGenerativePressedOverlay,
} from "../../../gradients";

const base = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "1.75rem",
  width: "fit-content",
  textDecoration: "none",
  cursor: "pointer",
  boxSizing: "border-box",
  padding: `${varsThemeBase.spacing["1-5"]} ${varsThemeBase.spacing[3]}`,
  gap: varsThemeBase.spacing[1],
  fontWeight: varsThemeBase.fontWeight.medium,
  lineHeight: varsThemeBase.lineWeight.body.base,
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.sans,
  color: varsThemeBase.colors.neutral.textHigh,
  borderRadius: varsThemeBase.shape.border.radius[2],
  borderWidth: varsThemeBase.shape.border.width[1],
  borderStyle: "solid",
  borderColor: varsThemeBase.colors.neutral.interactive,
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  ":disabled": {
    color: varsThemeBase.colors.neutral.textDisabled,
    cursor: "not-allowed",
  },
  ":focus-visible": {
    boxShadow: varsThemeBase.utils.focus,
    outline: "none",
  },
});

export const fullWidth = style({
  width: "100%",
});

export const size = styleVariants({
  medium: {},
  small: {
    height: "1.5rem",
    padding: `${varsThemeBase.spacing["1-5"]} ${varsThemeBase.spacing[2]}`,
    fontSize: varsThemeBase.fontSize.body.caption,
    lineHeight: varsThemeBase.lineWeight.body.caption,
  },
  large: {
    height: "2.75rem",
    padding: `${varsThemeBase.spacing[3]} ${varsThemeBase.spacing[4]}`,
    fontSize: varsThemeBase.fontSize.body.highlight,
    borderRadius: varsThemeBase.shape.border.radius[3],
    gap: varsThemeBase.spacing[2],
    lineHeight: varsThemeBase.lineWeight.body.base,
  },
});

export const appearance = styleVariants({
  primary: [
    base,
    {
      background: varsThemeBase.colors.primary.interactive,
      borderColor: varsThemeBase.colors.primary.interactive,
      color: varsThemeBase.colors.neutral.background,
      selectors: {
        "&:not(:disabled):hover": {
          background: varsThemeBase.colors.primary.interactiveHover,
          borderColor: varsThemeBase.colors.primary.interactiveHover,
        },
        "&:not(:disabled):active": {
          background: varsThemeBase.colors.primary.interactivePressed,
          borderColor: varsThemeBase.colors.primary.interactivePressed,
        },
        "&:not(:disabled):focus": {
          borderColor: varsThemeBase.colors.primary.interactiveHover,
        },
      },
      ":disabled": {
        background: varsThemeBase.colors.primary.surfaceDisabled,
        borderColor: varsThemeBase.colors.primary.surfaceDisabled,
      },
    },
  ],
  danger: [
    base,
    {
      background: varsThemeBase.colors.danger.interactive,
      borderColor: varsThemeBase.colors.danger.interactive,
      color: varsThemeBase.colors.danger.textHigh,
      selectors: {
        "&:not(:disabled):hover": {
          background: varsThemeBase.colors.danger.interactiveHover,
          borderColor: varsThemeBase.colors.danger.interactiveHover,
        },
        "&:not(:disabled):active": {
          background: varsThemeBase.colors.danger.interactivePressed,
          borderColor: varsThemeBase.colors.danger.interactivePressed,
        },
        "&:not(:disabled):focus": {
          borderColor: varsThemeBase.colors.danger.interactive,
        },
      },
      ":disabled": {
        background: varsThemeBase.colors.danger.surfaceDisabled,
        borderColor: varsThemeBase.colors.danger.surfaceDisabled,
      },
    },
  ],
  success: [
    base,
    {
      background: varsThemeBase.colors.success.interactive,
      borderColor: varsThemeBase.colors.success.interactive,
      color: varsThemeBase.colors.success.textHigh,
      selectors: {
        "&:not(:disabled):hover": {
          background: varsThemeBase.colors.success.interactiveHover,
          borderColor: varsThemeBase.colors.success.interactiveHover,
        },
        "&:not(:disabled):active": {
          background: varsThemeBase.colors.success.interactivePressed,
          borderColor: varsThemeBase.colors.success.interactivePressed,
        },
        "&:not(:disabled):focus": {
          borderColor: varsThemeBase.colors.success.interactive,
        },
      },
      ":disabled": {
        background: varsThemeBase.colors.success.surfaceDisabled,
        borderColor: varsThemeBase.colors.success.surfaceDisabled,
      },
    },
  ],
  warning: [
    base,
    {
      background: varsThemeBase.colors.warning.interactive,
      borderColor: varsThemeBase.colors.warning.interactive,
      color: varsThemeBase.colors.warning.textHigh,
      selectors: {
        "&:not(:disabled):hover": {
          background: varsThemeBase.colors.warning.interactiveHover,
          borderColor: varsThemeBase.colors.warning.interactiveHover,
        },
        "&:not(:disabled):active": {
          background: varsThemeBase.colors.warning.interactivePressed,
          borderColor: varsThemeBase.colors.warning.interactivePressed,
        },
        "&:not(:disabled):focus": {
          borderColor: varsThemeBase.colors.warning.interactive,
        },
      },
      ":disabled": {
        background: varsThemeBase.colors.warning.surfaceDisabled,
        borderColor: varsThemeBase.colors.warning.surfaceDisabled,
      },
    },
  ],
  neutral: [
    base,
    {
      background: varsThemeBase.colors.neutral.surface,
      borderColor: varsThemeBase.colors.neutral.interactive,
      color: varsThemeBase.colors.neutral.textHigh,
      selectors: {
        "&:not(:disabled):hover": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
          borderColor: varsThemeBase.colors.neutral.interactive,
        },
        "&:not(:disabled):active": {
          backgroundColor: varsThemeBase.colors.neutral.interactive,
          borderColor: varsThemeBase.colors.neutral.interactivePressed,
        },
        "&:not(:disabled):focus": {
          borderColor: varsThemeBase.colors.primary.interactive,
        },
      },
      ":disabled": {
        background: varsThemeBase.colors.neutral.surfaceDisabled,
        borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
        color: varsThemeBase.colors.neutral.interactive,
      },
    },
  ],
  transparent: [
    base,
    {
      background: "transparent",
      borderColor: "transparent",
      color: varsThemeBase.colors.neutral.textHigh,
      selectors: {
        "&:not(:disabled):hover": {
          backgroundColor: varsThemeBase.colors.neutral.surface,
        },
        "&:not(:disabled):active": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
        },
      },
      ":disabled": {
        color: varsThemeBase.colors.neutral.interactive,
        background: "transparent",
        borderColor: "transparent",
      },
    },
  ],
  "ai-primary": [
    base,
    {
      background: gradients.aiGenerativeInteractive,
      border: "none",
      color: varsThemeBase.colors.neutral.background,
      transition: `all ${varsThemeBase.motion.speed.fast} ease`,
      selectors: {
        "&:not(:disabled):hover": {
          background: aiGenerativeHoverOverlay,
        },
        "&:not(:disabled):active": {
          background: aiGenerativePressedOverlay,
        },
      },
      ":disabled": {
        background: gradients.aiGenerativeDisabled,
        color: varsThemeBase.colors.neutral.textDisabled,
      },
    },
  ],
  "ai-secondary": [
    base,
    {
      background: varsThemeBase.colors.aiGenerative.background,
      borderColor: varsThemeBase.colors.aiGradient.purpleHigh,
      color: varsThemeBase.colors.neutral.textHigh,
      selectors: {
        "&:not(:disabled):hover": {
          backgroundColor: varsThemeBase.colors.aiGenerative.surface,
        },
        "&:not(:disabled):active": {
          backgroundColor: varsThemeBase.colors.aiGenerative.surfaceHighlight,
        },
        "&:not(:disabled):focus": {
          borderColor: varsThemeBase.colors.aiGradient.purpleHigh,
        },
      },
      ":disabled": {
        background: varsThemeBase.colors.neutral.surfaceDisabled,
        borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
        color: varsThemeBase.colors.neutral.interactive,
      },
    },
  ],
});
