import { HTMLAttributes } from "react";
import { ProgressBarSkeleton } from "./components";

export interface ProgressBarComponents {
  Skeleton: typeof ProgressBarSkeleton;
}

export interface ProgressBarProperties {
  /**
   * The progression value between 0 and 100.
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
    | "ai-gradient";
}

export type ProgressBarBaseProps = ProgressBarProperties &
  Omit<HTMLAttributes<HTMLDivElement>, keyof ProgressBarProperties>; 
