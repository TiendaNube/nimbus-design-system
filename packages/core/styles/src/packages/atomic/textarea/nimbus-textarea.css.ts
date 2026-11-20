import { style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";
import { gradients, createBorderGradient } from "../../../gradients";
import { thinScrollbar } from "../../../utils/scrollbar.css";

const textareaTheme = varsThemeBase.components.textarea;
const inputTheme = varsThemeBase.components.input;
const { background } = varsThemeBase.colors.neutral;
const aiHoverOverlay = inputTheme.aiGenerative.hover.overlay;

// CSS custom properties for consistent height calculations
const textareaHeightVars = style({
  vars: {
    "--textarea-padding-y": textareaTheme.paddingY,
    "--textarea-padding-x": textareaTheme.paddingX,
    "--textarea-border-width": varsThemeBase.shape.border.width[1],
    "--textarea-vertical-padding": `calc(var(--textarea-padding-y) * 2)`,
    "--textarea-vertical-borders": `calc(var(--textarea-border-width) * 2)`,
  },
});

// Marks `aiGenerated`, which the Textarea applies together with an appearance,
// so the appearance hover and focus ring leave its AI border and ring alone.
const aiGeneratedMarker = style({});

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
    lineHeight: textareaTheme.lineHeight,
    color: varsThemeBase.colors.neutral.textHigh,
    borderRadius: inputTheme.borderRadius,
    padding: "var(--textarea-padding-y) var(--textarea-padding-x)",
    transition: `all ${varsThemeBase.motion.speed.fast} ease`,
    "::placeholder": {
      color: varsThemeBase.colors.neutral.textLow,
    },
    ":disabled": {
      border: `var(--textarea-border-width) solid ${inputTheme.disabled.borderColor}`,
      backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
      color: varsThemeBase.colors.neutral.textDisabled,
      cursor: "not-allowed",
    },
  },
]);

// Rest, hover and disabled colors come from `components.input`; the focus
// from `components.textarea`. `:focus-visible` goes after `:focus` so keyboard
// focus keeps its ring. Hover skips disabled and focused fields, so their
// borders win (selectors are emitted after the pseudo-classes).
const tone = (name: "neutral" | "success" | "warning" | "danger") => ({
  border: `var(--textarea-border-width) solid ${inputTheme[name].borderColor}`,
  backgroundColor: inputTheme[name].background,
  ":focus": {
    borderColor: textareaTheme[name].focus.borderColor,
  },
  ":focus-visible": {
    boxShadow: textareaTheme.focusVisible.boxShadow,
  },
  selectors: {
    [`&:hover:not(:disabled, :focus, ${aiGeneratedMarker})`]: {
      borderColor: inputTheme[name].hover.borderColor,
    },
    [`&:focus:not(:focus-visible, ${aiGeneratedMarker})`]: {
      boxShadow: textareaTheme.focus.boxShadow,
    },
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
      borderWidth: "var(--textarea-border-width)",
      borderStyle: "solid",
      borderColor: "transparent",
      ":focus-visible": {
        boxShadow: textareaTheme.focusVisible.boxShadow,
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
  transparent: [
    base,
    {
      border: "none",
      backgroundColor: varsThemeBase.colors.neutral.background,
      ":focus": {
        borderColor: "transparent",
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
  aiGeneratedMarker,
  appearance["ai-generative"],
  { boxShadow: inputTheme.aiGenerated.boxShadow },
]);
