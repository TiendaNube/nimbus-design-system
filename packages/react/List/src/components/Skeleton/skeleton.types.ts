import { HTMLAttributes, ReactNode } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Element to be rendered inside the Skeleton component */
  children: ReactNode;
  /** Data element to reference during testing */
  "data-testid"?: string;
}
