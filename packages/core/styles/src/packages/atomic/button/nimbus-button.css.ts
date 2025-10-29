import { style, styleVariants, globalStyle } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";
import { createBorderGradient, gradients } from "../../../gradients";

const base = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "2rem",
  width: "fit-content",
  textDecoration: "none",
  cursor: "pointer",
  boxSizing: "border-box",
  padding: `${varsThemeBase.spacing[2]} ${varsThemeBase.spacing[4]}`,
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
    height: "1.75rem",
    padding: `${varsThemeBase.spacing["1-5"]} ${varsThemeBase.spacing[2]}`,
    fontSize: varsThemeBase.fontSize.body.caption,
    lineHeight: varsThemeBase.lineWeight.body.caption,
  },
});

export const appearance = styleVariants({
  primary: [
    base,
    {
      background: varsThemeBase.colors.primary.interactive,
      borderColor: varsThemeBase.colors.primary.interactive,
      color: varsThemeBase.colors.neutral.background,
      ":hover": {
        background: varsThemeBase.colors.primary.interactiveHover,
        borderColor: varsThemeBase.colors.primary.interactiveHover,
      },
      ":active": {
        background: varsThemeBase.colors.primary.interactivePressed,
        borderColor: varsThemeBase.colors.primary.interactivePressed,
      },
      ":disabled": {
        background: varsThemeBase.colors.neutral.surfaceDisabled,
        borderColor: varsThemeBase.colors.primary.surfaceHighlight,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactiveHover,
      },
    },
  ],
  danger: [
    base,
    {
      background: varsThemeBase.colors.danger.surface,
      borderColor: varsThemeBase.colors.danger.interactive,
      color: varsThemeBase.colors.danger.textLow,
      ":hover": {
        background: varsThemeBase.colors.danger.surfaceHighlight,
        borderColor: varsThemeBase.colors.danger.interactiveHover,
      },
      ":active": {
        background: varsThemeBase.colors.danger.interactive,
        borderColor: varsThemeBase.colors.danger.interactivePressed,
      },
      ":disabled": {
        background: varsThemeBase.colors.neutral.surfaceDisabled,
        borderColor: varsThemeBase.colors.danger.surfaceHighlight,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.danger.interactive,
      },
    },
  ],
  neutral: [
    base,
    {
      background: varsThemeBase.colors.neutral.surface,
      borderColor: varsThemeBase.colors.neutral.interactive,
      color: varsThemeBase.colors.neutral.textHigh,
      ":hover": {
        backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
        borderColor: varsThemeBase.colors.neutral.interactiveHover,
      },
      ":active": {
        backgroundColor: varsThemeBase.colors.neutral.interactive,
        borderColor: varsThemeBase.colors.neutral.interactivePressed,
      },
      ":disabled": {
        background: varsThemeBase.colors.neutral.surfaceDisabled,
        borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactive,
      },
    },
  ],
  transparent: [
    base,
    {
      background: "transparent",
      borderColor: "transparent",
      color: varsThemeBase.colors.neutral.textHigh,
      ":hover": {
        backgroundColor: varsThemeBase.colors.neutral.surface,
        borderColor: varsThemeBase.colors.neutral.interactiveHover,
      },
      ":active": {
        backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
        borderColor: varsThemeBase.colors.neutral.interactivePressed,
      },
      ":disabled": {
        color: varsThemeBase.colors.neutral.textDisabled,
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
      transition: `box-shadow ${varsThemeBase.motion.speed.fast} ease`,
      ":hover": {
        background: gradients.aiGenerativeHover,
      },
      ":active": {
        background: varsThemeBase.colors.aiGenerative.textLow,
      },
      ":disabled": {
        background: createBorderGradient(
          gradients.aiGenerativeDisabled,
          varsThemeBase.colors.neutral.surfaceDisabled
        ),
        color: varsThemeBase.colors.neutral.textDisabled,
      },
    },
  ],
  "ai-secondary": [
    base,
    {
      background: createBorderGradient(
        gradients.aiGenerativeInteractive,
        varsThemeBase.colors.neutral.background
      ),
      borderColor: "transparent",
      color: varsThemeBase.colors.neutral.textHigh,
      transition: `box-shadow ${varsThemeBase.motion.speed.fast} ease`,
      position: "relative",
      ":before": {
        content: "",
        position: "absolute",
        inset: "-0.5px",
        background: gradients.aiGenerativeHover,
        filter: "blur(8px)",
        zIndex: -1,
        opacity: 0,
        transition: `opacity ${varsThemeBase.motion.speed.fast} ease`,
      },
      ":hover": {
        background: createBorderGradient(
          gradients.aiGenerativeHover,
          varsThemeBase.colors.neutral.surface
        ),
      },
      ":active": {
        background: createBorderGradient(
          gradients.aiGenerativeHover,
          varsThemeBase.colors.aiGenerative.surfaceHighlight
        ),
      },
      ":disabled": {
        background: createBorderGradient(
          gradients.aiGenerativeDisabled,
          varsThemeBase.colors.neutral.surfaceDisabled
        ),
        color: varsThemeBase.colors.neutral.textDisabled,
      },
    },
  ],
});

const aiSecondaryStyle = appearance["ai-secondary"];

globalStyle(`${aiSecondaryStyle}:hover:before`, {
  opacity: 0.5,
});
