import { HTMLAttributes, ReactNode } from "react";
import { accordion } from "@nimbus-ds/styles";

export interface AccordionBodyProps extends HTMLAttributes<HTMLElement> {
  /** Accordion Body content */
  children: ReactNode;
  /** Accordion Body borderBottom */
  borderBottom?: keyof typeof accordion.properties.borderTop;
}
