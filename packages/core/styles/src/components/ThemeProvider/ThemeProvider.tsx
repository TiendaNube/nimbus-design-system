import React, { useMemo } from "react";

import { themes } from "./themeProvider.definitions";
import { type ThemeProviderProps } from "./themeProvider.types";
import { ThemeProviderContext } from "./contexts";

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme = "base",
  ...rest
}) => {
  const refThemeProvider = React.useRef(null);

  const context = useMemo(
    () => ({ refThemeProvider, currentTheme: theme }),
    [refThemeProvider, theme]
  );

  return (
    <div className={themes[theme]} {...rest} ref={refThemeProvider}>
      <ThemeProviderContext.Provider value={context}>
        {children}
      </ThemeProviderContext.Provider>
    </div>
  );
};

ThemeProvider.displayName = "ThemeProvider";

export { ThemeProvider };
