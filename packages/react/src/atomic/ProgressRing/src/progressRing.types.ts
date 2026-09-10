import { type SVGAttributes } from "react";

export interface ProgressRingProperties {
  /**
   * The progress value, from 0 to 100. Values outside that range are clamped.
   */
  value: number;
  /**
   * Sets the width and height of the ring.
   * @default large
   */
  size?: "small" | "medium" | "large" | number;
  /**
   * Accessible name for the progress indicator. Required: this component has no
   * visible label of its own.
   */
  "aria-label": string;
}

export type ProgressRingProps = ProgressRingProperties &
  Omit<
    SVGAttributes<SVGSVGElement>,
    "role" | "aria-valuenow" | "aria-valuemin" | "aria-valuemax" | "aria-label"
  >;
