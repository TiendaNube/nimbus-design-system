import { ReactNode, AnchorHTMLAttributes } from "react";
import { Skeleton } from "./components";

export interface LinkComponents {
  Skeleton: typeof Skeleton;
}

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Text to be displayed on link */
  children: ReactNode;
  /** Link appearance */
  appearance?: "primary" | "danger" | "neutral";
  /** Decoration for the link text */
  textDecoration?: "underline" | "none";
  /** Size of the link text */
  size?: "caption" | "base" | "highlight";
}
