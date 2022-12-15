import { HTMLAttributes, ReactNode } from "react";
import { BoxSprinkle } from "@nimbus-ds/styles";

type BoxExtends = BoxSprinkle & HTMLAttributes<HTMLDivElement>;

export interface BoxProps extends BoxExtends {
  /** Element to be rendered inside the Box component */
  children?: ReactNode;
}
