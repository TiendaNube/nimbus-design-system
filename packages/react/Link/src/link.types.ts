import { ReactNode, AnchorHTMLAttributes } from "react";
import { Skeleton } from "./components";

export interface LinkComponents {
  Skeleton: typeof Skeleton;
}

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Determine whether the link will visually render as a link or button */
  as?: "link" | "button";
  /** Text to be displayed on link */
  children: ReactNode;
  /** Link appearance */
  appearance?: "primary" | "danger" | "neutral";
  /** Decoration for the link text */
  textDecoration?: "underline" | "none";
  /** Size of the link text */
  size?: "caption" | "base" | "highlight";
}
