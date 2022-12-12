import { ReactNode, ButtonHTMLAttributes } from "react";
import { IconButtonSprinkle } from "@nimbus-ds/styles";

import { IconButtonSkeleton } from "./components";

type IconButtonExtends = IconButtonSprinkle &
  ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement>;

export interface IconButtonComponents {
  Skeleton: typeof IconButtonSkeleton;
}

export interface IconButtonProps extends IconButtonExtends {
  /** Type of html tag to create for the Icon Button component */
  as?: "button" | "div";
  /** Icon Button SVG */
  source: ReactNode;
}
