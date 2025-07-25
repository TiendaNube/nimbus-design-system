import React, { ReactElement, ReactNode } from "react";
import {
  generateGradientId,
  createSvgGradientDef,
  type Gradients,
} from "@nimbus-ds/styles";
import { SVGElementProps } from "@nimbus-ds/typings";

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

  // Check if this element should use gradient
  const shouldUseGradient = (elementProps: SVGElementProps): boolean => {
    const hasFillForGradient = Boolean(
      elementProps.fill &&
        elementProps.fill !== "none" &&
        elementProps.fill !== "transparent" &&
        !elementProps.fill.startsWith("url(")
    );

    const hasStrokeForGradient = Boolean(
      elementProps.stroke &&
        elementProps.stroke !== "none" &&
        elementProps.stroke !== "transparent" &&
        !elementProps.stroke.startsWith("url(")
    );

    return hasFillForGradient || hasStrokeForGradient;
  };

  // Create new props with gradient references
  const newProps: SVGElementProps = { ...props };

  if (shouldUseGradient(props)) {
    if (props.fill && props.fill !== "none" && props.fill !== "transparent") {
      newProps.fill = `url(#${gradientId})`;
    }
    if (
      props.stroke &&
      props.stroke !== "none" &&
      props.stroke !== "transparent"
    ) {
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
 * Applies gradient to an SVG ReactNode by processing its elements and adding gradient definitions
 * @param svgSource - The SVG ReactNode to process (can be an icon component or direct SVG)
 * @param gradient - The type of gradient to apply
 * @returns Processed SVG ReactNode with gradient applied
 */
export const applyGradientToSvg = (
  svgSource: ReactNode,
  gradient: Gradients
): ReactNode => {
  if (!React.isValidElement(svgSource)) {
    return svgSource;
  }

  const gradientId = generateGradientId();
  const gradientDef = createSvgGradientDef(gradientId, gradient);

  // Check if this is a React component (like HistoryIcon) or a direct SVG element
  if (typeof svgSource.type === "function") {
    // This is a component like HistoryIcon - render it to get the SVG
    const IconComponent = svgSource.type as React.FC<any>;
    const renderedSvg = IconComponent(svgSource.props);

    if (!React.isValidElement(renderedSvg)) {
      return svgSource;
    }

    // Process the rendered SVG to apply gradient references
    const processedSvg = processElement(renderedSvg, gradientId);

    // Add defs with gradient to the SVG
    const defsElement = React.createElement(
      "defs",
      { key: "gradient-defs" },
      gradientDef
    );

    // Clone the SVG and add the defs as the first child
    const existingChildren = React.Children.toArray(
      processedSvg.props.children || []
    );
    const newChildren = [defsElement, ...existingChildren];

    return React.cloneElement(processedSvg, {
      ...processedSvg.props,
      children: newChildren,
    });
  } else {
    // This is already an SVG element - process it directly
    const processedSvg = processElement(svgSource, gradientId);

    // Add defs with gradient to the SVG
    const defsElement = React.createElement(
      "defs",
      { key: "gradient-defs" },
      gradientDef
    );

    // Clone the SVG and add the defs as the first child
    const existingChildren = React.Children.toArray(
      processedSvg.props.children || []
    );
    const newChildren = [defsElement, ...existingChildren];

    return React.cloneElement(processedSvg, {
      ...processedSvg.props,
      children: newChildren,
    });
  }
};
