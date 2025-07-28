import { createContext, RefObject } from "react";

export interface ScrollPaneContextValue {
  direction: "horizontal" | "vertical";
  scrollToItemOnClick: boolean;
  containerRef?: RefObject<HTMLDivElement>;
  scrollToDirection: (direction: "start" | "end") => void;
}

export const ScrollPaneContext = createContext<ScrollPaneContextValue | null>(null); 
