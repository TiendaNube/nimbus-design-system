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

const { aiGradient } = varsThemeBase.colors;

export const aiGenerativeInteractive = createLinearGradient(
  "50deg",
  `${aiGradient.blueHigh} 28.22%`,
  `${aiGradient.purpleHigh} 49.27%`,
  `${aiGradient.pinkHigh} 83.12%`
);

export const aiGenerativeHover = createLinearGradient(
  "50deg",
  `${aiGradient.pinkHigh} 28.22%`,
  `${aiGradient.purpleHigh} 49.27%`,
  `${aiGradient.blueHigh} 83.12%`
);

export const aiGenerativeDisabled = createLinearGradient(
  "50deg",
  `${aiGradient.blueLight} 28.22%`,
  `${aiGradient.purpleLight} 49.27%`,
  `${aiGradient.pinkLight} 83.12%`
);
