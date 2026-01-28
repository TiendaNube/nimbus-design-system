import { type ReactNode, type HTMLAttributes } from "react";
import { type TitleSprinkle } from "@nimbus-ds/styles";
import { type TitleSkeleton } from "./components";

export interface TitleComponents {
  Skeleton: typeof TitleSkeleton;
}

export interface TitleProperties extends TitleSprinkle {
  /**
   * The content of the title.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Type of html tag to create for the title.
   * @default h1
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export type TitleProps = TitleProperties & HTMLAttributes<HTMLHeadingElement>;
