import React, { type ReactElement } from "react";
import { gradients } from "@nimbus-ds/styles";
import { type GradientStop, type GradientTypes } from "../types";
import { parseLinearGradient } from "../cssParser";

/**
 * Gets gradient color stops for supported gradient types by reusing existing gradient definitions.
 * Only the color stops come from the theme. The SVG gradient direction is set
 * by `createSvgGradientDef` (horizontal by default) and intentionally ignores
 * the CSS angle of `aiGenerativeLinearInteractive`.
 */
export const getGradientStops = (type: GradientTypes): GradientStop[] => {
  if (type === "linear") {
    return parseLinearGradient(gradients.aiGenerativeLinearInteractive);
  }

  console.warn(`Unsupported gradient type: ${type}`);
  return [];
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
    ...gradientStops.map((stop, index) =>
      React.createElement("stop", {
        // We'll never sort the stops and we're combining them with the gradientId
        // eslint-disable-next-line react/no-array-index-key
        key: `${gradientId}-stop-${index}`,
        offset: stop.offset,
        stopColor: stop.color,
      })
    )
  );
};
