import { type MutableRefObject } from "react";
import { type Theme } from "../../themeProvider.types";

export interface ThemeProviderContextProps {
  refThemeProvider: MutableRefObject<null | HTMLDivElement>;
  currentTheme: Theme;
  /**
   * Class that applies the current theme's variables. Floating elements rendered through a
   * portal outside the provider's node must carry it to keep the theme.
   */
  themeClassName: string;
}
