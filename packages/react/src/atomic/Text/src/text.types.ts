import { ReactNode, HTMLAttributes } from "react";
import { text } from "@nimbus-ds/styles";

import { TextSkeleton } from "./components";

export interface TextComponents {
  Skeleton: typeof TextSkeleton;
}

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Element to be rendered inside the Text component */
  children: ReactNode;
  /** Type of html tag to create for the Text component */
  as?: "p" | "span";
  /** Text size */
  fontSize?: keyof typeof text.properties.fontSize;
  /** Bold font for the text component */
  fontWeight?: keyof typeof text.properties.fontWeight;
  /** Text line height */
  lineHeight?: keyof typeof text.properties.lineHeight;
  /** Text alignment in content */
  textAlign?: typeof text.properties.textAlign[number];
  /** Text color */
  color?: keyof typeof text.properties.color;
}
