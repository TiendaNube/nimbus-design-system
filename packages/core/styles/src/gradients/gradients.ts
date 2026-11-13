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
 * stops. Angle and stops come from the theme (`aiGenerativeLinear`): Norte UI
 * goes to the bottom left, the other themes keep the original 50deg gradients.
 */
const linear = varsThemeBase.gradients.aiGenerativeLinear;

const linearGradient = (start: string, middle: string, end: string) =>
  `linear-gradient(${linear.angle}, ${start} 28.22%, ${middle} 49.27%, ${end} 83.12%)`;

export const aiGenerativeLinearInteractive = linearGradient(
  linear.start,
  linear.middle,
  linear.end
);

export const aiGenerativeLinearHover = linearGradient(
  linear.hoverStart,
  linear.hoverMiddle,
  linear.hoverEnd
);

export const aiGenerativeLinearDisabled = linearGradient(
  linear.disabledStart,
  linear.disabledMiddle,
  linear.disabledEnd
);
