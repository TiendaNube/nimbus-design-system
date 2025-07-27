import { createContext, RefObject } from "react";

export interface ScrollPaneContextValue {
  direction: "horizontal" | "vertical";
  scrollToItemOnClick: boolean;
  containerRef?: RefObject<HTMLDivElement>;
}

export const ScrollPaneContext = createContext<ScrollPaneContextValue | null>(null); 
