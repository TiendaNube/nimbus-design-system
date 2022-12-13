import { ReactNode, HTMLAttributes } from "react";
import { title } from "@nimbus-ds/styles";
import { TitleSkeleton } from "./components";

export interface TitleComponents {
  Skeleton: typeof TitleSkeleton;
}

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Element to be rendered inside the Title component */
  children: ReactNode;
  /** Type of html tag to create for the Title component */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Title alignment in content */
  textAlign?: keyof typeof title.properties.textAlign;
  /** Title color */
  color?: keyof typeof title.properties.colors;
}
