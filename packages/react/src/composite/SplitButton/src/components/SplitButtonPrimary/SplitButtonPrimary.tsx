import React from "react";
import { splitButton } from "@nimbus-ds/styles";

import { type SplitButtonPrimaryProps } from "./SplitButtonPrimary.types";
import { useSplitButtonContext } from "../../contexts";

export const SplitButtonPrimary: React.FC<SplitButtonPrimaryProps> = ({
  className,
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
      className={[className, splitButton.primaryAppearance.primary].join(" ")}
      disabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

SplitButtonPrimary.displayName = "SplitButton.Primary";
