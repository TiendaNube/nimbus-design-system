import { ReactNode, HTMLAttributes } from "react";
import { Skeleton } from "./components";

export interface TagComponents {
  Skeleton: typeof Skeleton;
}

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  /** Element to be rendered inside the Title component */
  children: ReactNode;
  /** Tag color */
  appearance?: "primary" | "success" | "warning" | "danger" | "neutral";
}
