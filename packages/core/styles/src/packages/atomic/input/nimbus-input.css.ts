import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";
import { gradients, createBorderGradient } from "../../../gradients";

export const input = vanillaStyle({
  padding: varsThemeBase.spacing[2],
  height: "2rem",
  width: "100%",
  boxSizing: "border-box",
  fontWeight: varsThemeBase.fontWeight.regular,
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.sans,
  color: varsThemeBase.colors.neutral.textHigh,
  border: "none",
  backgroundColor: "transparent",
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  ":focus-within": {
    outline: "none",
    boxShadow: "none",
  },
  ":disabled": {
    borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
    background: varsThemeBase.colors.neutral.surfaceDisabled,
    color: varsThemeBase.colors.neutral.textDisabled,
  },
});

export const container = vanillaStyle({
  display: "flex",
  alignItems: "center",
  position: "relative",
  width: "100%",
  borderWidth: varsThemeBase.shape.border.width[1],
  borderRadius: varsThemeBase.shape.border.radius[2],
  borderStyle: "solid",
  borderColor: varsThemeBase.colors.neutral.interactive,
  overflow: "hidden",
  ":focus-within": {
    outline: "none",
    boxShadow: varsThemeBase.utils.focus,
  },

  selectors: {
    "&:has(input:disabled)": {
      backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
      borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
    },
  },
});

export const container__icon = vanillaStyle({
  background: "transparent",
  border: "none",
  appearance: "none",
  padding: 0,
  ":focus-within": {
    outline: "none",
  },
});

export const container__icon_append = styleVariants({
  start: { paddingLeft: varsThemeBase.spacing[2] },
  end: { paddingRight: varsThemeBase.spacing[2] },
});

export const container__button = vanillaStyle({
  padding: "0",
  cursor: "pointer",
  background: "transparent",
  border: "none",
  ":focus": {
    boxShadow: "none",
  },
});

export const appearance = styleVariants({
  neutral: [
    container,
    {
      background: varsThemeBase.colors.neutral.background,
      borderColor: varsThemeBase.colors.neutral.interactive,
      ":focus-within": {
        borderColor: varsThemeBase.colors.primary.interactiveHover,
      },
    },
  ],
  success: [
    container,
    {
      background: varsThemeBase.colors.success.surface,
      borderColor: varsThemeBase.colors.success.interactive,
      ":focus-within": {
        borderColor: varsThemeBase.colors.success.interactiveHover,
      },
    },
  ],
  warning: [
    container,
    {
      background: varsThemeBase.colors.warning.surface,
      borderColor: varsThemeBase.colors.warning.interactive,
      ":focus-within": {
        borderColor: varsThemeBase.colors.warning.interactiveHover,
      },
    },
  ],
  danger: [
    container,
    {
      background: varsThemeBase.colors.danger.surface,
      borderColor: varsThemeBase.colors.danger.interactive,
      ":focus-within": {
        borderColor: varsThemeBase.colors.danger.interactiveHover,
      },
    },
  ],
  "ai-generative": [
    container,
    {
      background: createBorderGradient(
        gradients.aiGenerativeInteractive,
        varsThemeBase.colors.neutral.background
      ),
      borderColor: "transparent",
    },
  ],
});

export const aiGenerated = vanillaStyle([
  appearance["ai-generative"],
  { boxShadow: varsThemeBase.utils.aiFocus },
]);
