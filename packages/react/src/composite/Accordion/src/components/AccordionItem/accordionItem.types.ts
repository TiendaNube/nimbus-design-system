import { ReactNode } from "react";

export interface AccordionItemProperties {
  /**
   * The content of the accordion body.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Unique indicator to identify accordion items
   */
  index: string;
  /**
   * This is an attribute used to identify a DOM node for testing purposes.
   */
  testId?: string;
}

export type AccordionItemProps = AccordionItemProperties;
