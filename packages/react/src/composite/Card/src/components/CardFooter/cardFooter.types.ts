import { HTMLAttributes, ReactNode } from "react";

export interface CardFooterProperties {
  /**
   * The content of the card footer.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type CardFooterProps = CardFooterProperties &
  HTMLAttributes<HTMLElement>;
