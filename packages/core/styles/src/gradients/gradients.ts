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

export const aiGenerativeInteractive = createLinearGradient(
  "66deg",
  `${interactiveVars.start} 28.22%`,
  `${interactiveVars.middle} 49.27%`,
  `${interactiveVars.end} 83.12%`
);

const disabledVars = varsThemeBase.colors.aiGenerative.disabled;

export const aiGenerativeDisabled = createLinearGradient(
  "66deg",
  `${disabledVars.start} 28.22%`,
  `${disabledVars.middle} 49.27%`,
  `${disabledVars.end} 83.12%`
);
