import { HTMLAttributes, ReactNode } from "react";
import { accordion } from "@nimbus-ds/styles";

export interface AccordionHeaderProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** Accordion Header content */
  children?:
    | ReactNode
    | ((data: { selected: string; index: string }) => ReactNode);
  /** Accordion Header title */
  title?: string;
  /** Accordion Header subtitle */
  subtitle?: string;
  /** Accordion Header icon */
  icon?: ReactNode;
  /** Removes the arrow icon that shows if the accordion item is open or not which makes it possible to create a custom indicator  */
  noIconToggle?: boolean;
  /** Accordion Header borderTop */
  borderTop?: keyof typeof accordion.properties.borderTop;
  /** Accordion Header borderBottom */
  borderBottom?: keyof typeof accordion.properties.borderBottom;
}
