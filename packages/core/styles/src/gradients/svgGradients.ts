import React, { ReactElement } from "react";
import * as gradients from "./gradients";
import { GradientStop, GradientTypes } from "../types";

/**
 * Generates a unique ID for SVG gradient to avoid conflicts when multiple icons use gradients
 */
export const generateGradientId = (): string =>
  `nimbus-gradient-${Math.random().toString(36).slice(2, 11)}`;

/**
 * Extracts gradient color stops from CSS gradient strings
 * This allows reusing the gradient definitions from gradients.ts for SVG gradients
 */
const parseLinearGradient = (cssGradient: string): GradientStop[] => {
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

/**
 * Gets gradient color stops for supported gradient types by reusing existing gradient definitions
 */
export const getGradientStops = (type: GradientTypes): GradientStop[] => {
  switch (type) {
    case "linear":
      return parseLinearGradient(gradients.aiGradientInteractive);
    default:
      return [];
  }
};

/**
 * Creates a linear gradient definition element for SVG
 */
export const createSvgGradientDef = (
  gradientId: string,
  gradient: GradientTypes,
  direction: "horizontal" | "vertical" = "horizontal"
): ReactElement => {
  const gradientStops = getGradientStops(gradient);

  // Set gradient direction
  const gradientProps =
    direction === "horizontal"
      ? { x1: "0%", y1: "0%", x2: "100%", y2: "0%" }
      : { x1: "0%", y1: "0%", x2: "0%", y2: "100%" };

  return React.createElement(
    "linearGradient",
    {
      id: gradientId,
      gradientUnits: "objectBoundingBox",
      ...gradientProps,
    },
    ...gradientStops.map((stop) =>
      React.createElement("stop", {
        key: generateGradientId(),
        offset: stop.offset,
        stopColor: stop.color,
      })
    )
  );
};

/**
 * Injects gradient definitions into an SVG element as the first child
 */
export const injectGradientDefs = (
  svg: ReactElement,
  gradientDef: ReactElement
): ReactElement => {
  // Add defs with gradient to the SVG
  const defsElement = React.createElement(
    "defs",
    { key: "gradient-defs" },
    gradientDef
  );

  // Clone the SVG and add the defs as the first child
  const existingChildren = React.Children.toArray(svg.props.children || []);
  const newChildren = [defsElement, ...existingChildren];

  return React.cloneElement(svg, {
    ...svg.props,
    children: newChildren,
  });
};
