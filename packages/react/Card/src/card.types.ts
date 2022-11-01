import { HTMLAttributes, ReactNode } from "react";
import { card } from "@nimbus-ds/styles";
import { Skeleton, Header } from "./components";

export interface CardComponents {
  Header: typeof Header;
  Skeleton: typeof Skeleton;
}

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Card content */
  children: ReactNode;
  /** Card padding */
  padding?: keyof typeof card.properties.padding;
  /** Card background */
  backgroundColor?: keyof typeof card.properties.backgroundColor;
}
