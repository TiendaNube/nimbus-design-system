import { createContext } from "react";
import type { AccordionItemContextProps } from "./accordionItemContext.types";

export const AccordionItemContext = createContext<AccordionItemContextProps>(
  {} as AccordionItemContextProps
);
