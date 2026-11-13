import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";
import { gradients, createBorderGradient } from "../../../gradients";

const inputTheme = varsThemeBase.components.input;
const { background } = varsThemeBase.colors.neutral;
const aiHoverOverlay = inputTheme.aiGenerative.hover.overlay;

export const input = vanillaStyle({
  padding: inputTheme.padding,
  height: inputTheme.height,
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
  borderRadius: inputTheme.borderRadius,
  borderStyle: "solid",
  borderColor: varsThemeBase.colors.neutral.interactive,
  overflow: "hidden",
  ":focus-visible": {
    outline: "none",
    boxShadow: varsThemeBase.utils.focus,
  },

  selectors: {
    "&:has(input:disabled)": {
      backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
      borderColor: inputTheme.disabled.borderColor,
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

export const container__text = vanillaStyle({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  color: varsThemeBase.colors.neutral.textLow,
  fontWeight: varsThemeBase.fontWeight.regular,
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.sans,
  whiteSpace: "nowrap",
  userSelect: "none",
  selectors: {
    [`${container}:has(input:disabled) &`]: {
      color: varsThemeBase.colors.neutral.textDisabled,
    },
  },
});

export const container__text_append = styleVariants({
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

// `:hover` goes before `:focus-within` so a focused field keeps its focus
// border while hovered. The disabled rule in `container` is more specific and
// wins over both.
export const appearance = styleVariants({
  neutral: [
    container,
    {
      background: inputTheme.neutral.background,
      borderColor: inputTheme.neutral.borderColor,
      ":hover": {
        borderColor: inputTheme.neutral.hover.borderColor,
      },
      ":focus-within": {
        borderColor: inputTheme.neutral.focus.borderColor,
        boxShadow: inputTheme.neutral.focus.boxShadow,
      },
    },
  ],
  success: [
    container,
    {
      background: inputTheme.success.background,
      borderColor: inputTheme.success.borderColor,
      ":hover": {
        borderColor: inputTheme.success.hover.borderColor,
      },
      ":focus-within": {
        borderColor: inputTheme.success.focus.borderColor,
        boxShadow: inputTheme.success.focus.boxShadow,
      },
    },
  ],
  warning: [
    container,
    {
      background: inputTheme.warning.background,
      borderColor: inputTheme.warning.borderColor,
      ":hover": {
        borderColor: inputTheme.warning.hover.borderColor,
      },
      ":focus-within": {
        borderColor: inputTheme.warning.focus.borderColor,
        boxShadow: inputTheme.warning.focus.boxShadow,
      },
    },
  ],
  danger: [
    container,
    {
      background: inputTheme.danger.background,
      borderColor: inputTheme.danger.borderColor,
      ":hover": {
        borderColor: inputTheme.danger.hover.borderColor,
      },
      ":focus-within": {
        borderColor: inputTheme.danger.focus.borderColor,
        boxShadow: inputTheme.danger.focus.boxShadow,
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
      ":hover": {
        // Paints the theme overlay between the fill and the border gradient.
        // The overlay is transparent outside Norte UI, so the border is unchanged.
        background: [
          background,
          `linear-gradient(${background}, ${background}) padding-box, linear-gradient(${aiHoverOverlay}, ${aiHoverOverlay}) border-box, ${gradients.aiGenerativeLinearInteractive} border-box`,
        ],
      },
      ":focus-within": {
        boxShadow: inputTheme.aiGenerative.focus.boxShadow,
      },
    },
  ],
});

export const aiGenerated = vanillaStyle([
  appearance["ai-generative"],
  { boxShadow: inputTheme.aiGenerated.boxShadow },
]);
