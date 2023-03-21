import { SVGAttributes } from "react";

import { spinner } from "@nimbus-ds/styles";

export interface SpinnerProperties {
  /**
   * Sets the width and height of the spinner.
   * @default large
   */
  size?: "small" | "medium" | "large" | number;
  /**
   * Set the color for the spinner SVG fill.
   * @default primary-interactive
   */
  color?: keyof typeof spinner.properties.color;
}

export type SpinnerProps = SpinnerProperties & SVGAttributes<SVGElement>;
