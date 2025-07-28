import type { ReactNode } from "react";

export type ScrollPaneArrowProperties = {
  children: ReactNode;
};

export type ArrowVariant =
  | "horizontal-left"
  | "horizontal-right"
  | "vertical-top"
  | "vertical-bottom";
export type ScrollDirection = "start" | "end";

export interface ScrollPaneArrowBaseProps extends ScrollPaneArrowProperties {
  variant: ArrowVariant;
  direction: ScrollDirection;
}

// For documentation purposes
export type ScrollPaneArrowVerticalEndProperties = ScrollPaneArrowProperties;
export type ScrollPaneArrowVerticalStartProperties = ScrollPaneArrowProperties;
export type ScrollPaneArrowHorizontalEndProperties = ScrollPaneArrowProperties;
export type ScrollPaneArrowHorizontalStartProperties = ScrollPaneArrowProperties;
