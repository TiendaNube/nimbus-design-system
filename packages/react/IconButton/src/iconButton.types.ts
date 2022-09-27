import { ReactNode, AnchorHTMLAttributes } from "react";

import { Skeleton } from "./components";

export interface IconButtonComponents {
  Skeleton: typeof Skeleton;
}

export interface IconButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement | HTMLDivElement> {
  /** Type of html tag to create for the Icon Button component */
  as?: "a" | "div";
  /** Icon Button SVG */
  source: ReactNode;
}
