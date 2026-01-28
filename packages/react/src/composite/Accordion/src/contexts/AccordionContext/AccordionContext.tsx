import { createContext } from "react";
import type { AccordionContextProps } from "./accordionContext.types";

export const AccordionContext = createContext<AccordionContextProps>(
  {} as AccordionContextProps
);
