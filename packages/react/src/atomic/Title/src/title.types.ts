import { ReactNode, HTMLAttributes } from "react";
import { title } from "@nimbus-ds/styles";
import { TitleSkeleton } from "./components";

export interface TitleComponents {
  Skeleton: typeof TitleSkeleton;
}

export interface TitleProperties {
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
  /**
   * The textAlign property specifies the horizontal alignment of title.
   * @default left
   */
  textAlign?: typeof title.properties.textAlign[number];
  /**
   * The color property is used to set the color of the title.
   * @default primary-textHigh
   */
  color?: keyof typeof title.properties.color;
  /**
   * The fontSize property sets the size of the title.
   */
  fontSize?: keyof typeof title.properties.fontSize;
  /**
   * The fontWeight property sets how thick or thin characters in text should be displayed.
   * @default medium
   */
  fontWeight?: keyof typeof title.properties.fontWeight;
  /**
   * The lineHeight property specifies the line height of the title.
   * @default base
   */
  lineHeight?: keyof typeof title.properties.lineHeight;
}

export type TitleProps = TitleProperties & HTMLAttributes<HTMLHeadingElement>;
