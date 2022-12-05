import { ToastProps } from "../../toast.types";

export interface ToastContextProps {
  closeToast: (id: string) => void;
  addToast: (toast: Omit<ToastProps, "autoClose">) => void;
}
