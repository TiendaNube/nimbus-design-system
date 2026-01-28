import { HTMLAttributes, ReactNode } from "react";
import { accordion } from "@nimbus-ds/styles";

export interface AccordionHeaderProperties {
  /**
   * The content of the accordion header.
   * @TJS-type React.ReactNode | ((data: { selected: string; index: string }) => React.ReactNode);
   */
  children?:
    | ReactNode
    | ((data: { selected: string; index: string }) => ReactNode);
  /**
   * The title to display in the accordion header.
   */
  title?: string;
  /**
   * The subtitle to display in the accordion header.
   */
  subtitle?: string;
  /**
   * The SVG contents to display in the accordion header.
   * @TJS-type React.ReactNode
   */
  icon?: ReactNode;
  /**
   * Removes the arrow icon that shows if the accordion item is open or not which makes it possible to create a custom indicator.
   * @default false
   */
  noIconToggle?: boolean;
  /**
   * The borderTop property defines a lower border of the accordion header.
   * @default base
   */
  borderTop?: keyof typeof accordion.properties.borderTop;
  /**
   * The borderBottom property defines a lower border of the accordion header.
   */
  borderBottom?: keyof typeof accordion.properties.borderBottom;
}

export type AccordionHeaderProps = AccordionHeaderProperties &
  Omit<HTMLAttributes<HTMLElement>, "children">;
