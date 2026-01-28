import { type HTMLAttributes, type ReactNode } from "react";
import { type card } from "@nimbus-ds/styles";

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
  /**
   * The padding properties are used to generate space around an card's header content area.
   * @default none
   */
  padding?: keyof typeof card.subComponents.header.properties.padding;
}

export type CardHeaderProps = CardHeaderProperties &
  HTMLAttributes<HTMLElement>;
