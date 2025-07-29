import React, { ReactElement, ReactNode } from "react";
import { gradients } from "@nimbus-ds/styles";
import { SVGElementProps } from "@nimbus-ds/typings";
import { GradientStop, GradientTypes } from "./gradientUtils.types";

/**
 * Checks if a color value is valid (exists and is not "none" or "transparent")
 * @param color - The color value to check
 * @returns True if color is valid, false otherwise
 */
const isValidColorValue = (color: string | undefined): boolean =>
  Boolean(color && color !== "none" && color !== "transparent");

/**
 * Checks if a color value can use gradient (valid and not already a URL reference)
 * @param color - The color value to check
 * @returns True if color can use gradient, false otherwise
 */
const canUseGradient = (color: string | undefined): boolean =>
  isValidColorValue(color) && !color!.startsWith("url(");

/**
 * Generates a unique ID for SVG gradient to avoid conflicts when multiple icons use gradients
 */
const generateGradientId = (): string =>
  `nimbus-gradient-${Math.random().toString(36).slice(2, 11)}`;

/**
 * Injects gradient definitions into an SVG element as the first child
 */
const injectGradientDefs = (
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

/**
 * Recursively processes React elements to replace fill and stroke attributes with gradient references
 */
const processElement = (
  element: ReactElement,
  gradientId: string
): ReactElement => {
  if (!React.isValidElement(element)) {
    return element;
  }

  const props = element.props as SVGElementProps;

  // Process children recursively
  const processedChildren = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return processElement(child, gradientId);
    }
    return child;
  });

  // Create new props with gradient references
  const newProps: SVGElementProps = { ...props };

  if (canUseGradient(props.fill) || canUseGradient(props.stroke)) {
    if (isValidColorValue(props.fill)) {
      newProps.fill = `url(#${gradientId})`;
    }
    if (isValidColorValue(props.stroke)) {
      newProps.stroke = `url(#${gradientId})`;
    }
  }

  // Handle currentColor and other dynamic colors
  if (props.fill === "currentColor" || props.stroke === "currentColor") {
    if (props.fill === "currentColor") {
      newProps.fill = `url(#${gradientId})`;
    }
    if (props.stroke === "currentColor") {
      newProps.stroke = `url(#${gradientId})`;
    }
  }

  newProps.children = processedChildren;

  return React.cloneElement(element, newProps);
};

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
const getGradientStops = (type: GradientTypes): GradientStop[] => {
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
const createSvgGradientDef = (
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
 * Applies gradient to an SVG ReactNode by processing its elements and adding gradient definitions
 * @param svgSource - The SVG ReactNode to process (can be an icon component or direct SVG)
 * @param gradient - The type of gradient to apply
 * @returns Processed SVG ReactNode with gradient applied
 */
export const applyGradientToSvg = (
  svgSource: ReactNode,
  gradient: GradientTypes
): ReactNode => {
  if (!React.isValidElement(svgSource)) {
    return svgSource;
  }

  const gradientId = generateGradientId();
  const gradientDef = createSvgGradientDef(gradientId, gradient);

  // Check if this is a React component (like our SVG Icons), we need to render it to get the SVG
  if (typeof svgSource.type === "function") {
    try {
      const IconComponent = svgSource.type as React.FC<any>;
      const renderedSvg = IconComponent(svgSource.props);

      if (!React.isValidElement(renderedSvg)) {
        return svgSource;
      }

      const processedSvg = processElement(renderedSvg, gradientId);

      return injectGradientDefs(processedSvg, gradientDef);
    } catch (error) {
      // If component rendering fails, return the original svgSource to prevent crashes
      console.warn(
        "Failed to render SVG component for gradient application:",
        error
      );
      return svgSource;
    }
  }
  // This is already an SVG element - process it directly
  const processedSvg = processElement(svgSource, gradientId);

  return injectGradientDefs(processedSvg, gradientDef);
};
