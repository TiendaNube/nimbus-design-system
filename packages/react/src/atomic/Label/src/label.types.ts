import { HTMLAttributes, ReactNode } from "react";
import { LabelSkeleton } from "./components";

export interface LabelComponents {
  Skeleton: typeof LabelSkeleton;
}

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  /** Element to be rendered inside the Label component */
  children: ReactNode;
  /** ID of the node with which the label is associated */
  htmlFor?: string;
  /** If true the label will be visually hidden but maintain accessibility purpose */
  hidden?: boolean;
}
