import { ReactNode, CSSProperties } from "react";
import { BoxSprinkle } from "@nimbus-ds/styles";

export interface BoxProps extends BoxSprinkle {
  className?: string;
  style?: CSSProperties;
  /** Element to be rendered inside the Box component */
  children?: ReactNode;
  /** The underlying element to render — either a HTML element name or a React component.  */
  as?: any;
}
