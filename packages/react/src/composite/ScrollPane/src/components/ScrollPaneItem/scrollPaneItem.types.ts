import { type ReactNode } from "react";
import type React from "react";

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
   * Callback fired when the item is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export type ScrollPaneItemProps = ScrollPaneItemProperties & {
  style?: React.CSSProperties;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;
