import { useContext } from "react";

import {
  ThemeProviderContext,
  type ThemeProviderContextProps,
} from "../../contexts";

export const useTheme: () => ThemeProviderContextProps = () =>
  useContext(ThemeProviderContext);
