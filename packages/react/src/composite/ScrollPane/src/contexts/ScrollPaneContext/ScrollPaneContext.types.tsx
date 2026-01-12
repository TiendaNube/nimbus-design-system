import { RefObject } from "react";

export interface ScrollPaneContextValue {
  direction: "horizontal" | "vertical";
  scrollToItemOnClick: boolean;
  enableGrabScroll: boolean;
  containerRef?: RefObject<HTMLDivElement | null>;
  scrollToDirection: (direction: "start" | "end") => void;
}
