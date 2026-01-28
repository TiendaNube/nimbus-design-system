import type { SVGElementProps } from "@nimbus-ds/typings";

/**
 * Length of the unique identifier portion for gradient IDs
 */
const GRADIENT_ID_LENGTH = 9;

/**
 * SVG properties that can receive gradient references
 */
const GRADIENT_PROPERTIES: Array<
  keyof Pick<SVGElementProps, "fill" | "stroke">
> = ["fill", "stroke"];

export { GRADIENT_ID_LENGTH, GRADIENT_PROPERTIES };
