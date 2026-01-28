import { useContext } from "react";

import type { ToastContextProps } from "../../contexts";
import { ToastContext } from "../../contexts";

export const useToast: () => ToastContextProps = () => useContext(ToastContext);
