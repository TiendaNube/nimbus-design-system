import { createContext } from "react";
import type { ThemeProviderContextProps } from "./themeProviderContext.types";

export const ThemeProviderContext = createContext<ThemeProviderContextProps>(
  {} as ThemeProviderContextProps
);
