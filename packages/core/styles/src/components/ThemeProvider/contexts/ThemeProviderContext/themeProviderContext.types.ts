import { MutableRefObject } from "react";
import { Theme } from "../../themeProvider.types";

export interface ThemeProviderContextProps {
  refThemeProvider: MutableRefObject<null | HTMLDivElement>;
  currentTheme: Theme;
}
