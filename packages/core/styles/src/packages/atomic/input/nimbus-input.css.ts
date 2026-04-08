import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

export const input = vanillaStyle({
  padding: varsThemeBase.spacing[2],
  height: "1.75rem",
  width: "100%",
  boxSizing: "border-box",
  fontWeight: varsThemeBase.fontWeight.regular,
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.sans,
  color: varsThemeBase.colors.neutral.textHigh,
  border: "none",
  backgroundColor: "transparent",
  transition: `color ${varsThemeBase.motion.speed.fast} ease`,
  ":focus-within": {
    outline: "none",
    boxShadow: "none",
  },
  selectors: {
    "&::placeholder": {
      color: varsThemeBase.colors.neutral.textLow,
    },
    "&:disabled::placeholder": {
      color: varsThemeBase.colors.neutral.textDisabled,
    },
  },
  ":disabled": {
    backgroundColor: "transparent",
    color: varsThemeBase.colors.neutral.textDisabled,
  },
});

export const container = vanillaStyle({
  display: "flex",
  alignItems: "center",
  position: "relative",
  width: "100%",
  borderWidth: varsThemeBase.shape.border.width[1],
  borderRadius: varsThemeBase.shape.border.radius.base,
  borderStyle: "solid",
  borderColor: varsThemeBase.colors.neutral.interactive,
  overflow: "hidden",
  transition: `background-color ${varsThemeBase.motion.speed.fast} ease, border-color ${varsThemeBase.motion.speed.fast} ease, box-shadow ${varsThemeBase.motion.speed.fast} ease`,
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
      selectors: {
        "&:hover:not(:has(input:disabled))": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
          borderColor: varsThemeBase.colors.neutral.interactiveHover,
        },
        "&:has(input:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
          borderColor: varsThemeBase.colors.neutral.interactive,
        },
        "&:focus-within:not(:has(input:disabled))": {
          borderColor: varsThemeBase.colors.neutral.interactivePressed,
          boxShadow: `0 0 0 2px ${varsThemeBase.colors.neutral.interactive}`,
        },
      },
    },
  ],
  success: [
    container,
    {
      background: varsThemeBase.colors.neutral.background,
      borderColor: varsThemeBase.colors.success.interactive,
      selectors: {
        "&:has(input:not(:placeholder-shown)):not(:has(input:disabled))": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
        },
        "&:hover:not(:has(input:disabled))": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
          borderColor: varsThemeBase.colors.success.interactiveHover,
        },
        "&:has(input:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
          borderColor: varsThemeBase.colors.neutral.interactive,
        },
        "&:focus-within:not(:has(input:disabled))": {
          backgroundColor: varsThemeBase.colors.neutral.background,
          borderColor: varsThemeBase.colors.success.interactiveHover,
          boxShadow: `0 0 0 2px ${varsThemeBase.colors.success.interactive}`,
        },
      },
    },
  ],
  warning: [
    container,
    {
      background: varsThemeBase.colors.neutral.background,
      borderColor: varsThemeBase.colors.warning.interactive,
      selectors: {
        "&:has(input:not(:placeholder-shown)):not(:has(input:disabled))": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
        },
        "&:hover:not(:has(input:disabled))": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
          borderColor: varsThemeBase.colors.warning.interactiveHover,
        },
        "&:has(input:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
          borderColor: varsThemeBase.colors.neutral.interactive,
        },
        "&:focus-within:not(:has(input:disabled))": {
          backgroundColor: varsThemeBase.colors.neutral.background,
          borderColor: varsThemeBase.colors.warning.interactiveHover,
          boxShadow: `0 0 0 2px ${varsThemeBase.colors.warning.interactive}`,
        },
      },
    },
  ],
  danger: [
    container,
    {
      background: varsThemeBase.colors.neutral.background,
      borderColor: varsThemeBase.colors.danger.interactive,
      selectors: {
        "&:has(input:not(:placeholder-shown)):not(:has(input:disabled))": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
        },
        "&:hover:not(:has(input:disabled))": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
          borderColor: varsThemeBase.colors.danger.interactiveHover,
        },
        "&:has(input:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
          borderColor: varsThemeBase.colors.neutral.interactive,
        },
        "&:focus-within:not(:has(input:disabled))": {
          backgroundColor: varsThemeBase.colors.neutral.background,
          borderColor: varsThemeBase.colors.danger.interactiveHover,
          boxShadow: `0 0 0 2px ${varsThemeBase.colors.danger.interactive}`,
        },
      },
    },
  ],
  "ai-generative": [
    container,
    {
      background: varsThemeBase.colors.neutral.background,
      borderColor: varsThemeBase.colors.aiGenerative.textLow,
      selectors: {
        "&:has(input:not(:placeholder-shown)):not(:has(input:disabled))": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
        },
        "&:hover:not(:has(input:disabled))": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
          borderColor: varsThemeBase.colors.aiGenerative.textLow,
        },
        "&:has(input:disabled)": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
          borderColor: varsThemeBase.colors.neutral.interactive,
        },
        "&:focus-within:not(:has(input:disabled))": {
          backgroundColor: varsThemeBase.colors.neutral.background,
          borderColor: varsThemeBase.colors.aiGenerative.textLow,
          boxShadow: `0 0 0 2px ${varsThemeBase.colors.aiGenerative.interactive}`,
        },
      },
    },
  ],
});

export const aiGenerated = vanillaStyle([
  appearance["ai-generative"],
  {
    boxShadow: varsThemeBase.utils.aiFocus,
    selectors: {
      "&:has(input:disabled)": {
        boxShadow: "none",
      },
    },
  },
]);
