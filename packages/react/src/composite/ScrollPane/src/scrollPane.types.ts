import React, { ReactNode } from "react";
import type { BoxProps } from "@nimbus-ds/box";
import type { ScrollPaneItemProps } from "./components/ScrollPaneItem";

export interface ScrollPaneComponents {
  Item: React.FC<ScrollPaneItemProps>;
}

export interface ScrollPaneProperties {
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
   * Debounce delay in milliseconds for scroll end detection
   * @default 150
   */
  scrollEndDebounceDelay?: number;
}

export type ScrollPaneProps = ScrollPaneProperties & Omit<BoxProps, "children">;

export type ScrollPanePosition =
  | "horizontal-left"
  | "horizontal-right"
  | "vertical-top"
  | "vertical-bottom";
