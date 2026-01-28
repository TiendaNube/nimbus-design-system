import type { HTMLAttributes } from "react";

export type Theme = "dark" | "base" | "next" | "next-dark";

export interface ThemeProviderProps extends HTMLAttributes<HTMLElement> {
  theme?: Theme;
}
