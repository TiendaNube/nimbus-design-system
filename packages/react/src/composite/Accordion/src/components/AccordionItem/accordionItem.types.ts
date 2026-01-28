import { type ReactNode } from "react";

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
   * Determines if the accordion item is interactive (clickable) or static.
   * When false, the header renders as a div without click handlers, hover effects, or toggle icon.
   * @default true
   */
  interactive?: boolean;
  /**
   * This is an attribute used to identify a DOM node for testing purposes.
   */
  testId?: string;
}

export type AccordionItemProps = AccordionItemProperties;
