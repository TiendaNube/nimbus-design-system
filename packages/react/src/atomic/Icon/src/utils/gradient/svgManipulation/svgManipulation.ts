import React, { ReactElement } from "react";
import { SVGElementProps } from "@nimbus-ds/typings";
import { canUseGradient } from "../colorValidation";
import {
  GRADIENT_ID_LENGTH,
  GRADIENT_PROPERTIES,
} from "./svgManipulation.definitions";

/**
 * Generates a unique ID for SVG gradient to avoid conflicts when multiple icons use gradients
 * @returns A unique gradient ID string
 */
export const generateGradientId = (): string =>
  `nimbus-gradient-${Math.random()
    .toString(36)
    .slice(2, 2 + GRADIENT_ID_LENGTH)}`;

/**
 * Injects gradient definitions into an SVG element as the first child
 * @param svg - The SVG element to inject the gradient into
 * @param gradientDef - The gradient definition element to inject
 * @returns A new SVG element with the gradient definitions injected
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

/**
 * Recursively processes React elements to replace fill and stroke attributes with gradient references
 * @param element - The React element to process
 * @param gradientId - The gradient ID to reference in URL attributes
 * @returns A new React element with gradient references applied
 */
export const processElement = (
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

  // Apply gradients to valid properties in a single pass
  GRADIENT_PROPERTIES.forEach((property) => {
    const value = props[property];
    if (!value) return;
    
    // Apply gradient if the value can use gradient OR is currentColor
    if (canUseGradient(value) || value === "currentColor") {
      newProps[property] = `url(#${gradientId})`;
    }
  });

  newProps.children = processedChildren;

  return React.cloneElement(element, newProps);
};
