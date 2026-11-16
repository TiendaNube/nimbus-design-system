import { vars } from "./contract.css";

/** Same shape as `vars.components.button`, with plain string values. */
type StringLeaves<T> = {
  [K in keyof T]: T[K] extends string ? string : StringLeaves<T[K]>;
};

export type ButtonThemeValues = StringLeaves<typeof vars.components.button>;

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
  },
  danger: {
    background: vars.colors.danger.interactive,
    border: vars.colors.danger.interactive,
    text: vars.colors.danger.textHigh,
    hoverBackground: vars.colors.danger.interactiveHover,
    pressedBackground: vars.colors.danger.interactivePressed,
    disabledBackground: vars.colors.danger.surfaceDisabled,
    disabledBorder: vars.colors.danger.surfaceDisabled,
  },
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
