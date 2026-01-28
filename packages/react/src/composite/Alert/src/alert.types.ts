import { type HTMLAttributes, type ReactNode } from "react";
import { type AlertSkeleton } from "./components";

export interface AlertComponents {
  Skeleton: typeof AlertSkeleton;
}

export interface AlertProperties {
  /**
   * The content for the title of the alert.
   */
  title?: string;
  /**
   * Change the visual style of the alert.
   * @default neutral
   */
  appearance?: "primary" | "success" | "warning" | "danger" | "neutral";
  /**
   * The content of the alert.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Function to be passed on actioning the dismiss button.
   * @TJS-type () => void;
   */
  onRemove?: () => void;
  /**
   * Determines if the alert is shown or not.
   * @default true
   */
  show?: boolean;
}

export type AlertProps = AlertProperties & HTMLAttributes<HTMLElement>;
