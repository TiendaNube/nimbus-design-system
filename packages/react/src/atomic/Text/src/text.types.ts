import { ReactNode, HTMLAttributes } from "react";
import { text } from "@nimbus-ds/styles";

import { TextSkeleton } from "./components";

export interface TextComponents {
  Skeleton: typeof TextSkeleton;
}

export interface TextProperties {
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
  /**
   * The fontSize property sets the size of the text.
   * @default base
   */
  fontSize?: keyof typeof text.properties.fontSize;
  /**
   * The fontWeight property sets how thick or thin characters in text should be displayed.
   * @default regular
   */
  fontWeight?: keyof typeof text.properties.fontWeight;
  /**
   * The lineHeight property specifies the line height of the text.
   * @default base
   */
  lineHeight?: keyof typeof text.properties.lineHeight;
  /**
   * The textAlign property specifies the horizontal alignment of text.
   * @default left
   */
  textAlign?: typeof text.properties.textAlign[number];
  /**
   * The color property is used to set the color of the text.
   * @default neutral-textLow
   */
  color?: keyof typeof text.properties.color;
}

export type TextProps = TextProperties & HTMLAttributes<HTMLParagraphElement>;
