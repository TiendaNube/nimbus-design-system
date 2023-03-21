import { HTMLAttributes, ReactNode } from "react";
import { card } from "@nimbus-ds/styles";

export interface CardBodyProperties {
  /**
   * The content of the card body.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * The padding properties are used to generate space around an card's body content area.
   * @default none
   */
  padding?: keyof typeof card.properties.padding;
}

export type CardBodyProps = CardBodyProperties & HTMLAttributes<HTMLElement>;
