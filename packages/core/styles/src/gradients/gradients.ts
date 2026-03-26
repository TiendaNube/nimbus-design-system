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

const { aiGradient } = varsThemeBase.colors;

/**
 * LUMI radial gradient — exact Figma specification for AI generative interactive state.
 * Composed of 3 radial gradients (purple, blue, pink) over a solid pink base (#E5809D).
 */
const lumiBase = [
  "radial-gradient(172.39% 156.26% at 105.11% -15.62%, rgba(70, 41, 186, 0.90) 0%, rgba(70, 41, 186, 0.20) 56.73%)",
  "radial-gradient(84.01% 107.54% at 20.17% -22.66%, #0059D5 0%, rgba(0, 89, 213, 0.20) 100%)",
  "radial-gradient(135.71% 87.74% at 33.81% 109.38%, #D8446E 0%, rgba(216, 68, 110, 0.00) 95.37%)",
  aiGradient.pinkLight,
].join(", ");

export const aiGenerativeInteractive = lumiBase;

export const aiGenerativeHover = lumiBase;

export const aiGenerativeHoverOverlay = `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), ${lumiBase}`;

export const aiGenerativePressedOverlay = `linear-gradient(rgba(0,0,0,0.30), rgba(0,0,0,0.30)), ${lumiBase}`;

export const aiGenerativeDisabled = [
  "radial-gradient(172.39% 156.26% at 105.11% -15.62%, rgba(70, 41, 186, 0.18) 0%, rgba(70, 41, 186, 0.04) 56.73%)",
  "radial-gradient(84.01% 107.54% at 20.17% -22.66%, rgba(0, 89, 213, 0.20) 0%, rgba(0, 89, 213, 0.04) 100%)",
  "radial-gradient(135.71% 87.74% at 33.81% 109.38%, rgba(216, 68, 110, 0.20) 0%, rgba(216, 68, 110, 0.00) 95.37%)",
  `rgba(229, 128, 157, 0.20)`,
].join(", ");
