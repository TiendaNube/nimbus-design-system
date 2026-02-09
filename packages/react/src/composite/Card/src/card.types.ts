import { type HTMLAttributes, type ReactNode } from "react";
import { type card } from "@nimbus-ds/styles";
import { type CardBody, type CardFooter, type CardHeader } from "./components";

export interface CardComponents {
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Header: typeof CardHeader;
}

export interface CardProperties {
  /**
   * The content of the card.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * The padding properties are used to generate space around an card's content area.
   * @default base
   */
  padding?: keyof typeof card.properties.padding;
  /**
   * The backgroundColor property sets the background color of the card.
   * @default neutral-background
   */
  backgroundColor?: keyof typeof card.properties.backgroundColor;
}

export type CardProps = CardProperties & HTMLAttributes<HTMLElement>;
