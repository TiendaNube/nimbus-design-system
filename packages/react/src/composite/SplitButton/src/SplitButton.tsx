import React, { useState, useCallback, useMemo } from "react";
import { Box } from "@nimbus-ds/box";

import {
  type SplitButtonProps,
  type SplitButtonComponents,
} from "./splitButton.types";
import {
  SplitButtonAction,
  SplitButtonPrimary,
  SplitButtonSecondary,
} from "./components";
import { SplitButtonContext, type SplitButtonContextValue } from "./contexts";

/**
 * SplitButton component allows users to perform actions by clicking a primary button and displaying a dropdown menu with additional actions.
 */
const SplitButton: React.FC<SplitButtonProps> & SplitButtonComponents = ({
  className,
  children,
  disabled = false,
  open: controlledOpen,
  onOpenChange,
  popoverPosition = "bottom-end",
  ...rest
}: SplitButtonProps) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  const contextValue: SplitButtonContextValue = useMemo(
    () => ({
      disabled,
      open,
      popoverPosition,
      onOpenChange: handleOpenChange,
    }),
    [disabled, open, popoverPosition, handleOpenChange]
  );

  return (
    <SplitButtonContext.Provider value={contextValue}>
      <Box className={className} display="flex" gap="none" {...rest}>
        {children}
      </Box>
    </SplitButtonContext.Provider>
  );
};

SplitButton.Action = SplitButtonAction;
SplitButton.Primary = SplitButtonPrimary;
SplitButton.Secondary = SplitButtonSecondary;
SplitButton.displayName = "SplitButton";

export { SplitButton };
export { useSplitButtonContext } from "./contexts";
