import { HTMLAttributes } from "react";

export interface ThemeProviderProps extends HTMLAttributes<HTMLElement> {
  theme?: "dark" | "base";
}
