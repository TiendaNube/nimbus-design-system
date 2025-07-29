import { GRADIENT_COLORS } from "./colorValidation.definitions";

/**
 * Checks if a color value is valid (exists and is not "none" or "transparent")
 * @param color - The color value to check
 * @returns True if color is valid, false otherwise
 */
export const isValidColorValue = (color: string | undefined): boolean =>
  Boolean(color && color !== "none" && color !== "transparent");

/**
 * Checks if a color value can use gradient (valid and not already a URL reference)
 * @param color - The color value to check
 * @returns True if color can use gradient, false otherwise
 */
export const canUseGradient = (color: string): boolean =>
  isValidColorValue(color) && !color.startsWith("url(");

/**
 * Checks if a color value is a gradient
 * @param color - The color value to check
 * @returns True if color is a known gradient value, false otherwise
 */
export const isGradient = (color: string): boolean =>
  GRADIENT_COLORS.has(color);
