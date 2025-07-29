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
export const canUseGradient = (color: string | undefined): boolean =>
  isValidColorValue(color) && !color!.startsWith("url("); 

/**
 * Checks if a color value is a gradient
 */
export const isGradient = (color: string): boolean => color === "ai-interactive";
