import { globalStyle, style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";
import { gradients, createBorderGradient } from "../../../gradients";

const selectTheme = varsThemeBase.components.select;
const inputTheme = varsThemeBase.components.input;
const { background } = varsThemeBase.colors.neutral;
const aiHoverOverlay = inputTheme.aiGenerative.hover.overlay;

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
  margin: 0,
  paddingLeft: varsThemeBase.spacing[2],
  paddingRight: varsThemeBase.spacing[8],
  width: "100%",
  appearance: "none",
  outline: "none",
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  "::placeholder": {
    color: varsThemeBase.colors.neutral.textLow,
  },
  ":disabled": {
    border: `1px solid ${inputTheme.disabled.borderColor}`,
    backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
    color: varsThemeBase.colors.neutral.textDisabled,
    cursor: "not-allowed",
  },
});

export const size = styleVariants({
  medium: {
    // The height applies only to dropdowns: a numeric `size` (rendered as the
    // native `size` attribute) or `multiple` show a list box, which keeps its
    // native height. `size="1"` is still a dropdown.
    selectors: {
      '&:not([multiple]):not([size]), &:not([multiple])[size="1"]': {
        height: selectTheme.medium.height,
      },
    },
    paddingTop: selectTheme.medium.paddingY,
    paddingBottom: selectTheme.medium.paddingY,
    borderRadius: selectTheme.medium.borderRadius,
  },
  small: {
    height: selectTheme.small.height,
    fontSize: varsThemeBase.fontSize.body.caption,
    paddingTop: selectTheme.small.paddingY,
    paddingBottom: selectTheme.small.paddingY,
    borderRadius: selectTheme.small.borderRadius,
  },
});

// Rest, hover and disabled colors come from `components.input`; the focus
// from `components.select`. `:focus-visible` goes after `:focus` so keyboard
// focus keeps its ring. Hover skips disabled and focused fields, so their
// borders win (selectors are emitted after the pseudo-classes).
const tone = (name: "neutral" | "success" | "warning" | "danger") => ({
  border: `1px solid ${inputTheme[name].borderColor}`,
  backgroundColor: inputTheme[name].background,
  selectors: {
    "&:hover:not(:disabled, :focus)": {
      borderColor: inputTheme[name].hover.borderColor,
    },
  },
  ":focus": {
    borderColor: selectTheme[name].focus.borderColor,
    boxShadow: selectTheme.focus.boxShadow,
  },
  ":focus-visible": {
    boxShadow: selectTheme.focusVisible.boxShadow,
  },
});

export const appearance = styleVariants({
  neutral: [base, tone("neutral")],
  success: [base, tone("success")],
  warning: [base, tone("warning")],
  danger: [base, tone("danger")],
  "ai-generative": [
    base,
    {
      background: createBorderGradient(
        gradients.aiGenerativeInteractive,
        varsThemeBase.colors.neutral.background
      ),
      border: "transparent",
      borderWidth: varsThemeBase.shape.border.width[1],
      borderStyle: "solid",
      ":focus-visible": {
        boxShadow: selectTheme.focusVisible.boxShadow,
      },
      selectors: {
        // Paints the Input overlay between the fill and the border gradient.
        // The overlay is transparent outside Norte UI, so the border is unchanged.
        "&:hover:not(:disabled)": {
          background: [
            background,
            `linear-gradient(${background}, ${background}) padding-box, linear-gradient(${aiHoverOverlay}, ${aiHoverOverlay}) border-box, ${gradients.aiGenerativeLinearInteractive} border-box`,
          ],
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
  { boxShadow: inputTheme.aiGenerated.boxShadow },
]);
