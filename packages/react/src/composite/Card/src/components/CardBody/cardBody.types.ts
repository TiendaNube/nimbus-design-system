import { HTMLAttributes, ReactNode } from "react";
import { card } from "@nimbus-ds/styles";

export interface CardBodyProps extends HTMLAttributes<HTMLElement> {
  /** Body content */
  children: ReactNode;
  /** Card padding */
  padding?: keyof typeof card.properties.padding;
}
