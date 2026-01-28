import { createContext, useContext } from "react";
import type { PopoverProps } from "@nimbus-ds/popover";

export interface SplitButtonContextValue {
  disabled: boolean;
  open: boolean;
  onOpenChange: (newOpen: boolean) => void;
  popoverPosition: PopoverProps["position"];
}

export const SplitButtonContext = createContext<
  SplitButtonContextValue | undefined
>(undefined);

export const useSplitButtonContext = () => {
  const context = useContext(SplitButtonContext);
  if (!context) {
    throw new Error(
      "SplitButton compound components must be used within SplitButton"
    );
  }
  return context;
};
