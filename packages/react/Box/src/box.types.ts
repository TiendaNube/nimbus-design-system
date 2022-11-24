import { HTMLAttributes, ReactNode } from "react";
import { BoxSprinkle } from "@nimbus-ds/styles";

type Extends = BoxSprinkle & HTMLAttributes<HTMLDivElement>;

export interface BoxProps extends Extends {
  /** Element to be rendered inside the Box component */
  children?: ReactNode;
}
