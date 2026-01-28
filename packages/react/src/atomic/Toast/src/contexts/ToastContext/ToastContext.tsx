import { createContext } from "react";
import { type ToastContextProps } from "./toastContext.types";

export const ToastContext = createContext<ToastContextProps>(
  {} as ToastContextProps
);
