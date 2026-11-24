import { vars } from "./contract.css";

/** Same shape as `vars.components.button`, with plain string values. */
type StringLeaves<T> = {
  [K in keyof T]: T[K] extends string ? string : StringLeaves<T[K]>;
};

export type ButtonThemeValues = StringLeaves<typeof vars.components.button>;

export type ButtonTone = "danger" | "success" | "warning";

/** Filled tone Button (danger, success, warning), as in the Norte UI Figma. */
const buttonToneNorteui = (tone: ButtonTone): ButtonThemeValues["danger"] => ({
  background: vars.colors[tone].interactive,
  border: vars.colors[tone].interactive,
  text: vars.colors[tone].textHigh,
  hoverBackground: vars.colors[tone].interactiveHover,
  pressedBackground: vars.colors[tone].interactivePressed,
  disabledBackground: vars.colors[tone].surfaceDisabled,
  disabledBorder: vars.colors[tone].surfaceDisabled,
});

/**
 * Button values for next-norteui and next-norteui-dark, taken from the
 * Norte UI Button in Figma. They reference theme colors, so the dark theme
 * resolves its own palette automatically.
 *
 * `aiSecondaryHoverGlow` is passed by each theme because the AI
 * `interactive` color is only in the token palette, not in `vars`.
 */
export const buttonNorteui = (
  aiSecondaryHoverGlow: string
): ButtonThemeValues => ({
  small: {
    height: "1.5rem",
    padding: `${vars.spacing[1]} ${vars.spacing[2]}`,
    radius: vars.shape.border.radius.base,
  },
  medium: {
    height: "1.75rem",
    padding: `${vars.spacing[1]} ${vars.spacing[3]}`,
    radius: vars.shape.border.radius.base,
  },
  large: {
    height: "2rem",
    padding: `${vars.spacing[1]} ${vars.spacing[3]}`,
    radius: vars.shape.border.radius.base,
    gap: vars.spacing[1],
  },
  focus: `0 0 0 2px ${vars.colors.neutral.textLow}`,
  primary: {
    disabledBackground: vars.colors.primary.surfaceDisabled,
    disabledBorder: vars.colors.primary.surfaceDisabled,
  },
  neutral: {
    disabledBackground: vars.colors.neutral.surfaceHighlight,
    disabledBorder: vars.colors.neutral.interactive,
    focusBorder: vars.colors.neutral.interactive,
  },
  transparent: {
    hoverBorder: "transparent",
    pressedBorder: "transparent",
    // One step darker than base, as in the Norte UI Figma.
    hoverBackground: vars.colors.neutral.surfaceHighlight,
    pressedBackground: vars.colors.neutral.interactive,
  },
  danger: buttonToneNorteui("danger"),
  success: buttonToneNorteui("success"),
  warning: buttonToneNorteui("warning"),
  aiSecondary: {
    text: vars.colors.aiGenerative.textLow,
    background: vars.colors.aiGenerative.surface,
    // Figma uses the AI surface-disabled tone as the hover fill: it is the
    // next step after `surface`, not a disabled state.
    hoverBackground: vars.colors.aiGenerative.surfaceDisabled,
    hoverGlow: aiSecondaryHoverGlow,
    disabledBackground: vars.colors.aiGenerative.surface,
  },
});
