import { createContext } from "react";
import { CollapsibleContextProps } from "./collapsibleContext.types";

export const CollapsibleContext = createContext<CollapsibleContextProps>(
  {} as CollapsibleContextProps
);
