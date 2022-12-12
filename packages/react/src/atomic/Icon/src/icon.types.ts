import { ReactNode, HTMLAttributes } from "react";

import { icon } from "@nimbus-ds/styles";
import { IconSkeleton } from "./components";

export interface IconComponents {
  Skeleton: typeof IconSkeleton;
}

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  /** Icon SVG */
  source: ReactNode;
  /** Icon color */
  color?: keyof typeof icon.properties.color;
  /** Icon cursor */
  cursor?: typeof icon.properties.cursor[number];
}
