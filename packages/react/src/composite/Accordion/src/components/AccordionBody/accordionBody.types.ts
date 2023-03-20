import { HTMLAttributes, ReactNode } from "react";
import { accordion } from "@nimbus-ds/styles";

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
  borderBottom?: keyof typeof accordion.properties.borderTop;
}

export type AccordionBodyProps = AccordionBodyProperties &
  HTMLAttributes<HTMLElement>;
