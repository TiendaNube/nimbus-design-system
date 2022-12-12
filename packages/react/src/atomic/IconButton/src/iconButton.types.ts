import { ReactNode, ButtonHTMLAttributes } from "react";
import { IconButtonSprinkle } from "@nimbus-ds/styles";

import { Skeleton } from "./components";

type Extends = IconButtonSprinkle &
  ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement>;

export interface IconButtonComponents {
  Skeleton: typeof Skeleton;
}

export interface IconButtonProps extends Extends {
  /** Type of html tag to create for the Icon Button component */
  as?: "button" | "div";
  /** Icon Button SVG */
  source: ReactNode;
}
