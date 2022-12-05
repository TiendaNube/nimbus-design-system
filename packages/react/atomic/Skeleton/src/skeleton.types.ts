import { HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** width alignment in content */
  width: string;
  /** height alignment in content */
  height: string;
  /** borderRadius alignment in content */
  borderRadius?: string;
}
