import React, { ReactNode } from "react";
import { BoxProps } from "@nimbus-ds/box";

export interface ScrollPaneItemProperties {
  /**
   * The content to be rendered inside the scroll pane item
   */
  children: ReactNode;

  /**
   * Custom class name for styling
   */
  className?: string;

  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;

  /**
   * Callback fired when the item is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export type ScrollPaneItemProps = ScrollPaneItemProperties &
  Omit<BoxProps, "children">;
