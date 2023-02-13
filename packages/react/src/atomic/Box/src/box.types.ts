import { ReactNode, HTMLAttributes } from "react";
import { BoxSprinkle } from "@nimbus-ds/styles";

type BoxExtends = BoxSprinkle & HTMLAttributes<HTMLElement>;

export interface BoxProps extends BoxExtends {
  /** Element to be rendered inside the Box component */
  children?: ReactNode;
}
