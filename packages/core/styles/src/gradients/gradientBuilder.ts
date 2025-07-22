import type { GradientDirection, GradientColorStop } from "../types";

/**
 * Creates a linear gradient with flexible direction and multiple color stops
 * @param direction - The direction of the gradient (e.g., "180deg", "to right", "45deg")
 * @param colorStops - Variable number of color stops (e.g., "red", "blue 50%", "rgba(0,255,0,0.8)")
 * @returns CSS linear-gradient string
 * 
 * @example
 * createLinearGradient("180deg", "red", "blue")
 * createLinearGradient("to right", "red 0%", "yellow 50%", "blue 100%")
 * createLinearGradient("45deg", "rgba(255,0,0,0.5)", "transparent")
 */
export const createLinearGradient = (
  direction: GradientDirection,
  ...colorStops: GradientColorStop[]
): string => {
  if (colorStops.length === 0) {
    throw new Error("At least one color stop is required");
  }
  
  return `linear-gradient(${direction}, ${colorStops.join(", ")})`;
};
