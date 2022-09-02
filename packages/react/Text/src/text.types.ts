import { ReactNode, HTMLAttributes } from "react";
import { text } from "@nimbus-ds/styles";

import { Skeleton } from "./components";

export interface TextComponents {
  Skeleton: typeof Skeleton;
}

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Element to be rendered inside the Text component */
  children: ReactNode;
  /** Type of html tag to create for the Text component */
  as?: "p" | "span";
  /** Text alignment in content */
  textAlign?: "left" | "right" | "center" | "justify";
  /** Bold font for the text component */
  bold?: boolean;
  /** Text size */
  size?: "small" | "caption" | "base";
  /** Text line height */
  lineHeight?: "small" | "caption" | "base";
  /** Text color */
  color?: keyof typeof text.properties;
}
