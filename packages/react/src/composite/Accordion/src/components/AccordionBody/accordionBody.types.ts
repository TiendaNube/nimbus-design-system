import { type HTMLAttributes, type ReactNode } from "react";
import { type accordion } from "@nimbus-ds/styles";

export interface AccordionBodyProperties {
  /**
   * The content of the accordion body.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * The borderBottom property defines a lower border of the accordion body.
   * @default none
   */
  borderBottom?: keyof typeof accordion.properties.borderBottom;
  /**
   * The borderTop property defines a top border of the accordion body.
   * @default none
   */
  borderTop?: keyof typeof accordion.properties.borderTop;
  /**
   * Padding properties are used to generate space around the content area of an Accordion.Body..
   * @default base
   */
  padding?: keyof typeof accordion.properties.padding;
}

export type AccordionBodyProps = AccordionBodyProperties &
  HTMLAttributes<HTMLElement>;
