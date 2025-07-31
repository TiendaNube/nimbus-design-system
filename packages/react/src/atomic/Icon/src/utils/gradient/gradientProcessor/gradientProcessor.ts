import React, { ReactNode } from "react";
import { GradientTypes } from "../types";
import { generateGradientId, injectGradientDefs, processElement } from "../svgManipulation";
import { createSvgGradientDef } from "../gradientFactory";

/**
 * Applies gradient to an SVG ReactNode by processing its elements and adding gradient definitions
 * @param svgSource - The SVG ReactNode to process (can be an icon component or direct SVG)
 * @param gradientType - The type of gradient to apply
 * @returns Processed SVG ReactNode with gradient applied
 */
export const applyGradientToSvg = (
  svgSource: ReactNode,
  gradientType: GradientTypes = "linear"
): ReactNode => {
  if (!React.isValidElement(svgSource)) {
    return svgSource;
  }

  const gradientId = generateGradientId();
  const gradientDef = createSvgGradientDef(gradientId, gradientType);

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
