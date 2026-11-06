/**
 * Gradient utilities for the Nimbus styles packages.
 * These gradients can be used across any component by importing and applying them.
 *
 * @example
 * ```ts
 * import { gradients } from "../gradients";
 *
 * const myStyle = style({
 *   backgroundImage: gradients.aiGradient,
 * });
 * ```
 */
import { varsThemeBase } from "../themes";

/**
 * The values live in the theme (`vars.gradients.aiGenerative`), so each theme
 * can define its own gradient. Norte UI uses radial gradients; the other
 * themes keep the original linear ones.
 */
const { aiGenerative } = varsThemeBase.gradients;

export const aiGenerativeInteractive = aiGenerative.interactive;

export const aiGenerativeHover = aiGenerative.hover;

export const aiGenerativePressed = aiGenerative.pressed;

export const aiGenerativeDisabled = aiGenerative.disabled;
