import { type MutableRefObject } from "react";
import { type Theme } from "../../themeProvider.types";

export interface ThemeProviderContextProps {
  refThemeProvider: MutableRefObject<null | HTMLDivElement>;
  currentTheme: Theme;
}
