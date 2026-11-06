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

/**
 * Linear versions of the AI gradient, for strokes (borders) and SVG icons.
 * A radial gradient with several layers does not work there: a border only
 * positions the last layer, and an SVG `<linearGradient>` needs plain color
 * stops. `hover` and `disabled` keep the original linear gradients; their
 * colors come from `aiGradient`, so each theme resolves its own palette.
 */
const { aiGradient } = varsThemeBase.colors;
const linear = varsThemeBase.gradients.aiGenerativeLinear;

// Angle and stops come from the theme: Norte UI uses a 66deg pink-to-blue
// gradient, the other themes the original 50deg blue-to-pink one.
export const aiGenerativeLinearInteractive = `linear-gradient(${linear.angle}, ${linear.start} 28.22%, ${linear.middle} 49.27%, ${linear.end} 83.12%)`;

export const aiGenerativeLinearHover = `linear-gradient(50deg, ${aiGradient.pinkHigh} 28.22%, ${aiGradient.purpleHigh} 49.27%, ${aiGradient.blueHigh} 83.12%)`;

export const aiGenerativeLinearDisabled = `linear-gradient(50deg, ${aiGradient.blueLight} 28.22%, ${aiGradient.purpleLight} 49.27%, ${aiGradient.pinkLight} 83.12%)`;
