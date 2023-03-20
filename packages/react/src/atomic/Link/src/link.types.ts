import { ReactNode, HTMLAttributes } from "react";
import { link } from "@nimbus-ds/styles";
import { LinkSkeleton } from "./components";

export interface LinkComponents {
  Skeleton: typeof LinkSkeleton;
}

export interface LinkProps extends HTMLAttributes<HTMLElement> {
  /** Text to be displayed on link */
  children: ReactNode;
  /** Link appearance */
  appearance?: "primary" | "danger" | "neutral" | "neutral-background";
  /** Decoration for the link text */
  textDecoration?: typeof link.properties.textDecoration[number];
  /** Size of the link text */
  fontSize?: keyof typeof link.properties.fontSize;
  /** Link text line height */
  lineHeight?: keyof typeof link.properties.lineHeight;
}
