import { GradientStop } from "../types";

/**
 * Extracts gradient color stops from CSS gradient strings
 * This allows reusing the gradient definitions from gradients.ts for SVG gradients
 */
export const parseLinearGradient = (cssGradient: string): GradientStop[] => {
  // Extract color stops from linear-gradient string
  // Example: "linear-gradient(90deg, #0050C3 5%, #4736B4 40%, #D8446E 95%)"
  const match = cssGradient.match(/linear-gradient\([^,]+,\s*(.+)\)/);
  if (!match) return [];

  const colorStopsString = match[1];
  const stops: GradientStop[] = [];

  // Split by commas, but be careful with rgba() values that contain commas
  const colorStops = colorStopsString.split(/,(?![^()]*\))/);

  colorStops.forEach((stop) => {
    const trimmedStop = stop.trim();
    // Match color and optional percentage: "#0050C3 5%" or "rgba(0,80,195,1) 5%"
    const stopMatch = trimmedStop.match(/^(.+?)\s+(\d+%)$/);
    if (stopMatch) {
      stops.push({
        color: stopMatch[1].trim(),
        offset: stopMatch[2],
      });
    } else {
      // If no percentage, assume it's evenly distributed
      const index = colorStops.indexOf(stop);
      const percentage =
        colorStops.length === 1
          ? "100%"
          : `${(index / (colorStops.length - 1)) * 100}%`;
      stops.push({
        color: trimmedStop,
        offset: percentage,
      });
    }
  });

  return stops;
}; 
