import { HTMLAttributes, ReactNode } from "react";

export interface CardHeaderProperties {
  /**
   * The content of the card header.
   * @TJS-type React.ReactNode
   */
  children?: ReactNode;
  /**
   * The title to display in the card header.
   */
  title?: string;
}

export type CardHeaderProps = CardHeaderProperties &
  HTMLAttributes<HTMLElement>;
