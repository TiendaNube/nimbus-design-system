import { HTMLAttributes, ReactNode } from "react";
import { Skeleton } from "./components";

export interface LabelComponents {
  Skeleton: typeof Skeleton;
}

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  /** SVG icon to be displayed on chip */
  children: ReactNode;
  htmlFor?: string;
  hidden?: boolean;
}
