import { useContext } from "react";

import {
  ThemeProviderContext,
  ThemeProviderContextProps,
} from "../../contexts";

export const useTheme: () => ThemeProviderContextProps = () =>
  useContext(ThemeProviderContext);
