import { RefObject } from "react";

export interface ScrollPaneContextValue {
  direction: "horizontal" | "vertical";
  scrollToItemOnClick: boolean;
  enableGrabScroll: boolean;
  containerRef?: RefObject<HTMLDivElement>;
  scrollToDirection: (direction: "start" | "end") => void;
}
