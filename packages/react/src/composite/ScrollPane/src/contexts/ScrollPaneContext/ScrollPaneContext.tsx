import { createContext, useContext } from "react";
import { type ScrollPaneContextValue } from "./ScrollPaneContext.types";

export const ScrollPaneContext = createContext<ScrollPaneContextValue | null>(
  null
);

export const useScrollPaneContext = (): ScrollPaneContextValue => {
  const context = useContext(ScrollPaneContext);
  if (!context) {
    throw new Error("useScrollPaneContext must be used within a ScrollPane");
  }
  return context;
};
