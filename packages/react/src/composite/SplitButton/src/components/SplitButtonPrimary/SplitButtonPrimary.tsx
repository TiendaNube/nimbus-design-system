import React from "react";
import { splitButton } from "@nimbus-ds/styles";

import { SplitButtonPrimaryProps } from "./SplitButtonPrimary.types";
import { useSplitButtonContext } from "../../contexts";

export const SplitButtonPrimary: React.FC<SplitButtonPrimaryProps> = ({
  children,
  disabled,
  onClick,
  ...rest
}) => {
  const context = useSplitButtonContext();
  const isDisabled = disabled ?? context.disabled;

  return (
    <button
      type="button"
      className={splitButton.primaryAppearance.primary}
      disabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

SplitButtonPrimary.displayName = "SplitButton.Primary";
