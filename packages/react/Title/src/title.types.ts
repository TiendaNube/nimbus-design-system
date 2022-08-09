import { ReactNode, HTMLAttributes } from "react";

export interface TitleProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, "className" | "style"> {
  /** Element to be rendered inside the Title component */
  children: ReactNode;
  /** Type of html tag to create for the Title component */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Title alignment in content */
  textAlign?: "start" | "end" | "left" | "right" | "center" | "justify";
}
