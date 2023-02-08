import { HTMLAttributes, ReactNode } from "react";
import { AccordionBody, AccordionItem, AccordionHeader } from "./components";

export interface AccordionComponents {
  Body: typeof AccordionBody;
  Item: typeof AccordionItem;
  Header: typeof AccordionHeader;
}

export interface AccordionProps extends HTMLAttributes<HTMLElement> {
  /** Accordion Item content */
  children?: ReactNode;
  /** Informs which accordion item is open by default, this value must be the same as informed in the index of each item */
  selectedDefault?: string;
}
