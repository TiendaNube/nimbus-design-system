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

  const themeClassName = themes[theme];

  const context = useMemo(
    () => ({ refThemeProvider, currentTheme: theme, themeClassName }),
    [refThemeProvider, theme, themeClassName]
  );

  return (
    <div className={themeClassName} {...rest} ref={refThemeProvider}>
      <ThemeProviderContext.Provider value={context}>
        {children}
      </ThemeProviderContext.Provider>
    </div>
  );
};

ThemeProvider.displayName = "ThemeProvider";

export { ThemeProvider };
