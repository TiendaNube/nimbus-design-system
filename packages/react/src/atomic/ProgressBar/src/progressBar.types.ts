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
}

export type ProgressBarBaseProps = ProgressBarProperties &
  Omit<HTMLAttributes<HTMLDivElement>, keyof ProgressBarProperties>;
