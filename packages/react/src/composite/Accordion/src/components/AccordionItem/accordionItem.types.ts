import { ReactNode } from "react";

export interface AccordionItemProps {
  /** Accordion Item content */
  children: ReactNode;
  /** Unique indicator to identify accordion items */
  index: string;
  /** Accordion Item testId */
  testId?: string;
}
