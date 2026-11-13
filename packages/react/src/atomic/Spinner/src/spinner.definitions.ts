import { themeVars } from "@nimbus-ds/styles";

export const sizes = {
  large: 32,
  medium: 24,
  small: 16,
};

/**
 * Additional opt-in spinner colors (Norte UI approximation, Path C).
 * Each value resolves to the active theme's semantic color, so `base`, `dark`,
 * `next` and `next-dark` stay invariant unless a consumer opts in.
 * Exported so Toast and Button (loading/success/warning) can reuse the same set.
 */
export const extendedColors = {
  "warning-textLow": themeVars.colors.warning.textLow,
  "ai-generativeTextLow": themeVars.colors.aiGenerative.textLow,
} as const;

export type SpinnerExtendedColor = keyof typeof extendedColors;

export const isExtendedColor = (
  color: string | undefined
): color is SpinnerExtendedColor =>
  !!color && Object.prototype.hasOwnProperty.call(extendedColors, color);
