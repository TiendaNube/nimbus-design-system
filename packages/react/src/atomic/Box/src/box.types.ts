import { ReactNode, HTMLAttributes } from "react";
import { BoxSprinkle } from "@nimbus-ds/styles";

type BoxExtends = BoxSprinkle & Omit<HTMLAttributes<HTMLElement>, "color">;

export interface BoxProps extends BoxExtends {
  /** Element to be rendered inside the Box component */
  children?: ReactNode;
}
