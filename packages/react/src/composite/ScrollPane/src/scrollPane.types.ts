import React, { ReactNode } from "react";
import { BoxProps } from "@nimbus-ds/box";
import { ScrollPaneItemProps } from "./components/ScrollPaneItem";

export interface ScrollPaneComponents {
  Item: React.FC<ScrollPaneItemProps>;
}

export interface ScrollPaneProps extends Omit<BoxProps, "children"> {
  /**
   * The content to be rendered inside the scroll pane
   */
  children: ReactNode;
  
  /**
   * Whether to show gradient overlays when content overflows
   * @default true
   */
  showGradients?: boolean;
  
  /**
   * Whether to show navigation arrows for scrolling
   * @default false
   */
  showArrows?: boolean;
  
  /**
   * Whether to show the scrollbar
   * @default true
   */
  showScrollbar?: boolean;
  
  /**
   * The direction of the scroll (horizontal or vertical)
   * @default "horizontal"
   */
  direction?: "horizontal" | "vertical";
  
  /**
   * Whether items should scroll into view when clicked
   * @default true
   */
  scrollToItemOnClick?: boolean;
  
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
} 

export type ScrollPaneArrowPosition = "horizontal-left" | "horizontal-right" | "vertical-top" | "vertical-bottom";

export type ScrollPaneGradientPosition = "horizontal-left" | "horizontal-right" | "vertical-top" | "vertical-bottom";
