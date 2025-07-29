import React, { ReactElement } from "react";
import { SVGElementProps } from "@nimbus-ds/typings";
import { canUseGradient, isValidColorValue } from "../colorValidation";

/**
 * Generates a unique ID for SVG gradient to avoid conflicts when multiple icons use gradients
 */
export const generateGradientId = (): string =>
  `nimbus-gradient-${Math.random().toString(36).slice(2, 11)}`;

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

/**
 * Recursively processes React elements to replace fill and stroke attributes with gradient references
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
