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
import { createLinearGradient } from "./gradientBuilder";

const interactiveVars = varsThemeBase.colors.aiGenerative.interactive;

export const aiGradientInteractive = createLinearGradient(
  "90deg",
  `${interactiveVars.start} 5%`,
  `${interactiveVars.middle} 40%`,
  `${interactiveVars.end} 95%`
);
