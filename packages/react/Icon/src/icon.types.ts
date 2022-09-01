import { ReactNode, HTMLAttributes } from "react";

import { icon } from "@nimbus-ds/styles";
import { Skeleton } from "./components";

export interface IconComponents {
  Skeleton: typeof Skeleton;
}

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  /** Icon SVG */
  source: ReactNode;
  /** Icon color */
  color?: keyof typeof icon.properties;
}
