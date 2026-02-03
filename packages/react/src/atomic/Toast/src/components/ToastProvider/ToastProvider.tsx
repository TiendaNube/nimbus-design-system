import React, { useCallback, useMemo } from "react";
import { toast as toastStyle } from "@nimbus-ds/styles";

import { ToastContext } from "../../contexts";
import { ToastProps } from "../../toast.types";
import { Toast } from "../../Toast";
import { ToastProviderProps } from "./toastProvider.types";
import { uniqueId } from "./toastProvider.definitions";

const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  offset = "default",
}) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = useCallback(
    ({ id, ...newToast }: Omit<ToastProps, "id"> & { id?: string }): void => {
      setToasts((prevState) => [
        ...prevState,
        { ...newToast, id: id || uniqueId() },
      ]);
    },
    []
  );

  const closeToast = useCallback((id: string) => {
    setToasts((prevState) => prevState.filter((toast) => toast.id !== id));
  }, []);

  const contextValue = useMemo(
    () => ({ closeToast, addToast }),
    [closeToast, addToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className={toastStyle.classnames.container[offset]}>
        {toasts.map((toast, index) => (
          <Toast key={toast.id} position={index} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = "ToastProvider";

export { ToastProvider };
