import { createContext } from "react";
import { AccordionItemContextProps } from "./accordionItemContext.types";

export const AccordionItemContext = createContext<AccordionItemContextProps>(
  {} as AccordionItemContextProps
);
