import { ReactNode, HTMLAttributes } from "react";
import { TextSprinkle } from "@nimbus-ds/styles";

import { TextSkeleton } from "./components";

export interface TextComponents {
  Skeleton: typeof TextSkeleton;
}

export interface TextProperties extends Omit<TextSprinkle, "WebkitLineClamp"> {
  /**
   * The content of the link.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Type of html tag to create for the Text component.
   * @default p
   */
  as?: "p" | "span";
}

export type TextProps = TextProperties &
  Omit<TextSprinkle, "WebkitLineClamp"> &
  HTMLAttributes<HTMLParagraphElement>;
