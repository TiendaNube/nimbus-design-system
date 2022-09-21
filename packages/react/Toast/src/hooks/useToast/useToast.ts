import { useContext } from "react";

import { ToastContext, ToastContextProps } from "../../contexts";

export const useToast: () => ToastContextProps = () => useContext(ToastContext);
