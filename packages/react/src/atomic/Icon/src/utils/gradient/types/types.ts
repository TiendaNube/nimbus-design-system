/**
 * Represents a color stop in a gradient with offset position and color value.
 * Used for parsing and creating SVG gradient definitions.
 */
export type GradientStop = {
  offset: string;
  color: string;
};

/**
 * Available gradient variants for components.
 * Currently supports the Nimbus AI gradient styling.
 */
export type GradientTypes = "linear";
