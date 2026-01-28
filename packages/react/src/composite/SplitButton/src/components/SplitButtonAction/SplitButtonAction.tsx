import React from "react";
import { Box } from "@nimbus-ds/box";
import { Icon } from "@nimbus-ds/icon";
import { Text } from "@nimbus-ds/text";

import { SplitButtonActionProps } from "./SplitButtonAction.types";

const SplitButtonAction: React.FC<SplitButtonActionProps> = ({
  children,
  icon,
  onClick,
  disabled = false,
  ...rest
}) => (
  <Box
    backgroundColor={{
      xs: "transparent",
      hover: disabled ? "transparent" : "neutral-surface",
    }}
    borderWidth="none"
    display="flex"
    alignItems="center"
    gap="2"
    paddingX="2"
    paddingY="1"
    borderRadius="1"
    {...rest}
    onClick={onClick}
    disabled={disabled}
    cursor={disabled ? "auto" : "pointer"}
    as="button"
    type="button"
  >
    {icon && (
      <Icon
        color={disabled ? "neutral-textDisabled" : "neutral-textHigh"}
        source={icon}
      />
    )}
    <Text
      fontSize="base"
      color={disabled ? "neutral-textDisabled" : "neutral-textHigh"}
    >
      {children}
    </Text>
  </Box>
);

SplitButtonAction.displayName = "SplitButton.Action";

export { SplitButtonAction };
