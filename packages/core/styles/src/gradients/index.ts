import * as gradients from "./gradients";
import {
  createLinearGradient,
  createBorderGradient as createBorderGradientBase,
} from "./gradientBuilder";

/**
 * Borders use the linear version of the AI gradients: the theme value can be
 * a radial gradient with several layers, and a border only positions the last
 * layer, so the others would repeat around the corners.
 *
 * This lives here and not in `gradientBuilder` because the themes import
 * `gradientBuilder`, and `gradients` imports the themes.
 */
const linearBorderGradients: Record<string, string> = {
  [gradients.aiGenerativeInteractive]: gradients.aiGenerativeLinearInteractive,
  [gradients.aiGenerativeHover]: gradients.aiGenerativeLinearHover,
  [gradients.aiGenerativeDisabled]: gradients.aiGenerativeLinearDisabled,
};

/**
 * Creates a border gradient with a fallback background color.
 * AI generative gradients are swapped for their linear version.
 * @param gradient - The gradient to use for the border.
 * @param backgroundColor - The background color to use for the fallback.
 * @returns An array with the fallback background color and the border gradient.
 */
const createBorderGradient = (
  gradient: string,
  backgroundColor: string
): [string, string] =>
  createBorderGradientBase(
    linearBorderGradients[gradient] ?? gradient,
    backgroundColor
  );

export { gradients, createLinearGradient, createBorderGradient };
export {
  aiGenerativeInteractive,
  aiGenerativeHover,
  aiGenerativePressed,
  aiGenerativeDisabled,
  aiGenerativeLinearInteractive,
  aiGenerativeLinearHover,
  aiGenerativeLinearDisabled,
} from "./gradients";
