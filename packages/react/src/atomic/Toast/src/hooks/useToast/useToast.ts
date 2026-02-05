import { useContext } from "react";

import { ToastContext, type ToastContextProps } from "../../contexts";

export const useToast: () => ToastContextProps = () => useContext(ToastContext);
