import { createContext } from "react";
import type { CollapsibleContextProps } from "./collapsibleContext.types";

export const CollapsibleContext = createContext<CollapsibleContextProps>(
  {} as CollapsibleContextProps
);
