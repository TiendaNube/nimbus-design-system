import React, { ReactNode } from "react";
import type { BoxProps } from "@nimbus-ds/box";
import type { ScrollPaneItemProps } from "./components/ScrollPaneItem";
import type {
  ScrollPaneArrowHorizontalStartProperties,
  ScrollPaneArrowHorizontalEndProperties,
  ScrollPaneArrowVerticalStartProperties,
  ScrollPaneArrowVerticalEndProperties,
} from "./components/ScrollPaneArrow";

export interface ScrollPaneComponents {
  Item: React.FC<ScrollPaneItemProps>;
  ArrowHorizontalStart: React.FC<ScrollPaneArrowHorizontalStartProperties>;
  ArrowHorizontalEnd: React.FC<ScrollPaneArrowHorizontalEndProperties>;
  ArrowVerticalStart: React.FC<ScrollPaneArrowVerticalStartProperties>;
  ArrowVerticalEnd: React.FC<ScrollPaneArrowVerticalEndProperties>;
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
   * Custom arrow component to render at the start of the scroll area
   */
  scrollPaneArrowStart?: React.ReactNode;

  /**
   * Custom arrow component to render at the end of the scroll area
   */
  scrollPaneArrowEnd?: React.ReactNode;
}

export type ScrollPaneProps = ScrollPaneProperties & Omit<BoxProps, "children">;

export type ScrollPanePosition =
  | "horizontal-left"
  | "horizontal-right"
  | "vertical-top"
  | "vertical-bottom";
