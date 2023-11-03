import { createContext } from "react";
import { ThemeProviderContextProps } from "./themeProviderContext.types";

export const ThemeProviderContext = createContext<ThemeProviderContextProps>(
  {} as ThemeProviderContextProps
);
