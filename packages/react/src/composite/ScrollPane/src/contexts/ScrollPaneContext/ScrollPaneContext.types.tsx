import { RefObject } from "react";
import type { ScrollPaneScrollBehavior } from "../../scrollPane.types";

export interface ScrollPaneContextValue {
  direction: "horizontal" | "vertical";
  scrollToItemOnClick: boolean;
  scrollBehavior: ScrollPaneScrollBehavior;
  enableGrabScroll: boolean;
  containerRef?: RefObject<HTMLDivElement | null>;
  scrollToDirection: (direction: "start" | "end") => void;
}
