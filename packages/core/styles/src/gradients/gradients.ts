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
import { createLinearGradient } from "./gradientBuilder";

export const aiGradient = createLinearGradient(
  "90deg",
  "#0050C3 5%",
  "#4736B4 40%",
  "#D8446E 95%"
);
