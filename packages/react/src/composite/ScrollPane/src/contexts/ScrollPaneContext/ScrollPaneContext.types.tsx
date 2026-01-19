import { RefObject } from "react";

export interface ScrollPaneContextValue {
  direction: "horizontal" | "vertical";
  scrollToItemOnClick: boolean;
  scrollBehavior: "hidden-items" | "always";
  enableGrabScroll: boolean;
  containerRef?: RefObject<HTMLDivElement | null>;
  scrollToDirection: (direction: "start" | "end") => void;
}
