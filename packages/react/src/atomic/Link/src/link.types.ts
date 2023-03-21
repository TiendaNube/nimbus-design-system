import { ReactNode, HTMLAttributes } from "react";
import { link } from "@nimbus-ds/styles";
import { LinkSkeleton } from "./components";

export interface LinkComponents {
  Skeleton: typeof LinkSkeleton;
}

export interface LinkProperties {
  /**
   * The content of the link.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Change the visual style of the link.
   * @default neutral
   */
  appearance?: "primary" | "danger" | "neutral" | "neutral-background";
  /**
   * The textDecoration property specifies the decoration added to link.
   * @default neutral
   */
  textDecoration?: typeof link.properties.textDecoration[number];
  /**
   * The fontSize property sets the size of the link.
   * @default base
   */
  fontSize?: keyof typeof link.properties.fontSize;
  /**
   * The lineHeight property specifies the line height of the link
   * @default base
   */
  lineHeight?: keyof typeof link.properties.lineHeight;
}

export type LinkProps = LinkProperties & HTMLAttributes<HTMLElement>;
