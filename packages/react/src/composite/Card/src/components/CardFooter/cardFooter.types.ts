import { card } from "@nimbus-ds/styles";
import { HTMLAttributes, ReactNode } from "react";

export interface CardFooterProperties {
  /**
   * The content of the card footer.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * The padding properties are used to generate space around an card's footer content area.
   * @default none
   */
  padding?: keyof typeof card.subComponents.footer.properties.padding;
}

export type CardFooterProps = CardFooterProperties &
  HTMLAttributes<HTMLElement>;
