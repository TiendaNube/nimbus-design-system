import React from "react";
import { splitButton } from "@nimbus-ds/styles";
import { ChevronDownIcon } from "@nimbus-ds/icons";
import { Popover } from "@nimbus-ds/popover";
import { Box } from "@nimbus-ds/box";

import { type SplitButtonSecondaryProps } from "./SplitButtonSecondary.types";
import { useSplitButtonContext } from "../../contexts";

export const SplitButtonSecondary: React.FC<SplitButtonSecondaryProps> = ({
  children,
  ariaLabel = "Show more actions",
  disabled,
  ...rest
}) => {
  const context = useSplitButtonContext();
  const isDisabled = disabled ?? context.disabled;

  return (
    <Popover
      visible={context.open}
      onVisibility={context.onOpenChange}
      position={context.popoverPosition}
      arrow={false}
      padding="small"
      width="280px"
      enabledClick
      enabledDismiss
      content={
        <Box display="flex" flexDirection="column" gap="1" width="100%">
          {children}
        </Box>
      }
    >
      <button
        type="button"
        className={splitButton.secondaryAppearance.primary}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-expanded={context.open}
        aria-haspopup="true"
        {...rest}
      >
        <ChevronDownIcon />
      </button>
    </Popover>
  );
};

SplitButtonSecondary.displayName = "SplitButton.Secondary";
