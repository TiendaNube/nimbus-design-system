import { HTMLAttributes, ReactNode } from "react";
import { card } from "@nimbus-ds/styles";
import { Body, Footer, Header } from "./components";

export interface CardComponents {
  Body: typeof Body;
  Footer: typeof Footer;
  Header: typeof Header;
}

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Card content */
  children: ReactNode;
  /** Card padding */
  padding?: keyof typeof card.properties.padding;
  /** Card background */
  backgroundColor?: keyof typeof card.properties.backgroundColor;
}
