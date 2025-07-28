import type { ReactNode } from "react";

export type ScrollPaneArrowProps = {
  children: ReactNode;
};

export type ArrowVariant =
  | "horizontal-left"
  | "horizontal-right"
  | "vertical-top"
  | "vertical-bottom";
export type ScrollDirection = "start" | "end";

export interface ScrollPaneArrowBaseProps extends ScrollPaneArrowProps {
  variant: ArrowVariant;
  direction: ScrollDirection;
}
