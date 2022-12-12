import { createContext } from "react";
import { ToastContextProps } from "./toastContext.types";

export const ToastContext = createContext<ToastContextProps>(
  {} as ToastContextProps
);
