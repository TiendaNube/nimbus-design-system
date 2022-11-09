import { HTMLAttributes, ReactNode } from "react";
import { BoxSprinkle, box } from "@nimbus-ds/styles";

type Extends = Parameters<typeof box.sprinkle>[0] &
  BoxSprinkle &
  HTMLAttributes<HTMLDivElement>;

export interface BoxProps extends Extends {
  /** Element to be rendered inside the Box component */
  children?: ReactNode;
}
