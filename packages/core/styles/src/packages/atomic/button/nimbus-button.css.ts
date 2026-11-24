import { style, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";
import { createBorderGradient, gradients } from "../../../gradients";

const base = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: varsThemeBase.components.button.medium.height,
  width: "fit-content",
  textDecoration: "none",
  cursor: "pointer",
  boxSizing: "border-box",
  padding: varsThemeBase.components.button.medium.padding,
  gap: varsThemeBase.spacing[1],
  fontWeight: varsThemeBase.fontWeight.medium,
  lineHeight: varsThemeBase.lineWeight.body.base,
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.sans,
  color: varsThemeBase.colors.neutral.textHigh,
  borderRadius: varsThemeBase.components.button.medium.radius,
  borderWidth: varsThemeBase.shape.border.width[1],
  borderStyle: "solid",
  borderColor: varsThemeBase.colors.neutral.interactive,
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  ":disabled": {
    color: varsThemeBase.colors.neutral.textDisabled,
    cursor: "not-allowed",
  },
  ":focus-visible": {
    boxShadow: varsThemeBase.components.button.focus,
    outline: "none",
  },
});

export const fullWidth = style({
  width: "100%",
});

export const size = styleVariants({
  medium: {},
  small: {
    height: varsThemeBase.components.button.small.height,
    padding: varsThemeBase.components.button.small.padding,
    borderRadius: varsThemeBase.components.button.small.radius,
    fontSize: varsThemeBase.fontSize.body.caption,
    lineHeight: varsThemeBase.lineWeight.body.caption,
  },
  large: {
    height: varsThemeBase.components.button.large.height,
    padding: varsThemeBase.components.button.large.padding,
    fontSize: varsThemeBase.fontSize.body.highlight,
    borderRadius: varsThemeBase.components.button.large.radius,
    gap: varsThemeBase.components.button.large.gap,
    lineHeight: varsThemeBase.lineWeight.body.base,
  },
});

/**
 * Filled tone Button. danger keeps the exact styles it had; success and
 * warning use the same recipe with their own tone.
 */
const toneAppearance = (tone: "danger" | "success" | "warning") => ({
  background: varsThemeBase.components.button[tone].background,
  borderColor: varsThemeBase.components.button[tone].border,
  color: varsThemeBase.components.button[tone].text,
  ":hover": {
    background: varsThemeBase.components.button[tone].hoverBackground,
    borderColor: varsThemeBase.colors[tone].interactiveHover,
  },
  ":active": {
    background: varsThemeBase.components.button[tone].pressedBackground,
    borderColor: varsThemeBase.colors[tone].interactivePressed,
  },
  ":disabled": {
    background: varsThemeBase.components.button[tone].disabledBackground,
    borderColor: varsThemeBase.components.button[tone].disabledBorder,
  },
  ":focus": {
    borderColor: varsThemeBase.colors[tone].interactive,
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
        background: varsThemeBase.components.button.primary.disabledBackground,
        borderColor: varsThemeBase.components.button.primary.disabledBorder,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactiveHover,
      },
    },
  ],
  danger: [base, toneAppearance("danger")],
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
        background: varsThemeBase.components.button.neutral.disabledBackground,
        borderColor: varsThemeBase.components.button.neutral.disabledBorder,
      },
      ":focus": {
        borderColor: varsThemeBase.components.button.neutral.focusBorder,
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
        backgroundColor:
          varsThemeBase.components.button.transparent.hoverBackground,
        borderColor: varsThemeBase.components.button.transparent.hoverBorder,
      },
      ":active": {
        backgroundColor:
          varsThemeBase.components.button.transparent.pressedBackground,
        borderColor: varsThemeBase.components.button.transparent.pressedBorder,
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
        // In base, dark, next and next-dark the pressed gradient is the flat
        // aiGenerative.textLow, so those themes look the same as before.
        background: gradients.aiGenerativePressed,
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
        varsThemeBase.components.button.aiSecondary.background
      ),
      borderColor: "transparent",
      color: varsThemeBase.components.button.aiSecondary.text,
      position: "relative",
      ":hover": {
        background: createBorderGradient(
          gradients.aiGenerativeHover,
          varsThemeBase.components.button.aiSecondary.hoverBackground
        ),
        boxShadow: `0 0 16px color-mix(in srgb, ${varsThemeBase.components.button.aiSecondary.hoverGlow} 70%, transparent)`,
      },
      ":active": {
        background: createBorderGradient(
          gradients.aiGenerativePressed,
          varsThemeBase.colors.aiGenerative.surfaceHighlight
        ),
      },
      ":disabled": {
        background: createBorderGradient(
          gradients.aiGenerativeDisabled,
          varsThemeBase.components.button.aiSecondary.disabledBackground
        ),
        color: varsThemeBase.colors.neutral.textDisabled,
      },
    },
  ],
  success: [base, toneAppearance("success")],
  warning: [base, toneAppearance("warning")],
});
