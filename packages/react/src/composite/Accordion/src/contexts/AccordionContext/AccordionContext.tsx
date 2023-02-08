import { createContext } from "react";
import { AccordionContextProps } from "./accordionContext.types";

export const AccordionContext = createContext<AccordionContextProps>(
  {} as AccordionContextProps
);
