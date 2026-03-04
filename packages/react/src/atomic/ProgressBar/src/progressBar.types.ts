import { type HTMLAttributes } from "react";
import { type ProgressBarSkeleton } from "./components";

export interface ProgressBarComponents {
  Skeleton: typeof ProgressBarSkeleton;
}

export interface ProgressBarProperties {
  /**
   * Progress value from 0 to 100
   * @note Always renders with a minimum 8px width for visual consistency
   */
  value: number;
  /**
   * Change the visual style of the progress bar.
   * @default neutral
   */
  appearance?:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "neutral"
    | "ai-generative";
  /**
   * Applies a box shadow to the progress bar fill using the appearance color.
   * @default 0
   */
  boxShadow?: 0 | 1 | 2;
  /**
   * Custom height for the progress bar. Any valid CSS height value.
   * @default "0.5rem"
   */
  height?: string;
  /**
   * Change the background color of the progress bar track.
   * @default neutral-surfaceDisabled
   */
  backgroundColor?: "neutral-surfaceDisabled" | "neutral-background";
}

export type ProgressBarBaseProps = ProgressBarProperties &
  Omit<HTMLAttributes<HTMLDivElement>, keyof ProgressBarProperties>;
