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
import tokens from "@nimbus-ds/tokens/dist/js/tokens";
import { createLinearGradient } from "./gradientBuilder";

const { interactive } = tokens.color.light.aiGenerative;

export const aiGradientInteractive = createLinearGradient(
  "90deg",
  `${interactive.start.value} 5%`,
  `${interactive.middle.value} 40%`,
  `${interactive.end.value} 95%`
);
