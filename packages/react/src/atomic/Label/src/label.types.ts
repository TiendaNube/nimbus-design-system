import { HTMLAttributes, ReactNode } from "react";
import { LabelSkeleton } from "./components";

export interface LabelComponents {
  Skeleton: typeof LabelSkeleton;
}

export interface LabelProperties {
  /**
   * The content of the label.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * The for attribute specifies which form element a label is bound to.
   */
  htmlFor?: string;
  /**
   * If true the label will be visually hidden but maintain accessibility purpose
   * @default false
   */
  hidden?: boolean;
}

export type LabelProps = LabelProperties & HTMLAttributes<HTMLElement>;
