import React from "react";

import { themes } from "./themeProvider.definitions";
import { ThemeProviderProps } from "./themeProvider.types";

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme = "base",
  ...rest
}) => (
  <div className={themes[theme]} {...rest}>
    {children}
  </div>
);

ThemeProvider.displayName = "ThemeProvider";

export { ThemeProvider };
