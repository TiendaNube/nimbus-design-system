import { HTMLAttributes, ReactNode } from "react";
import { card } from "@nimbus-ds/styles";
import { CardBody, CardFooter, CardHeader } from "./components";

export interface CardComponents {
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Header: typeof CardHeader;
}

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Card content */
  children: ReactNode;
  /** Card padding */
  padding?: keyof typeof card.properties.padding;
  /** Card background */
  backgroundColor?: keyof typeof card.properties.backgroundColor;
}
