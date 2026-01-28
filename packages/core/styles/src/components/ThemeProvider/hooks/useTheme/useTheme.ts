import { useContext } from "react";

import type { ThemeProviderContextProps } from "../../contexts";
import { ThemeProviderContext } from "../../contexts";

export const useTheme: () => ThemeProviderContextProps = () =>
  useContext(ThemeProviderContext);
