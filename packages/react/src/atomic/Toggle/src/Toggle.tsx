import React, { useMemo } from "react";
import { Text } from "@nimbus-ds/text";
import { toggle } from "@nimbus-ds/styles";
import { Box } from "@nimbus-ds/box";

import { ToggleProps, ToggleComponents } from "./toggle.types";
import { ToggleSkeleton } from "./components";

const Toggle: React.FC<ToggleProps> & ToggleComponents = ({
  className: _className,
  style: _style,
  label,
  id,
  name,
  active,
  disabled,
  ...rest
}: ToggleProps) => {
  const labelColor = useMemo(
    () => (disabled ? "neutral-textLow" : "neutral-textHigh"),
    [disabled]
  );

  return (
    <label
      htmlFor={id || name}
      className={toggle.classnames.container}
      tabIndex={disabled ? -1 : 0}
    >
      <input
        {...rest}
        id={id || name}
        name={name}
        type="checkbox"
        className={toggle.classnames.container__input}
        defaultChecked={active}
        disabled={disabled}
        aria-disabled={disabled}
      />
      <span
        data-testid="slider"
        className={toggle.classnames.container__slider}
      />
      {label && (
        <Box paddingRight="0-5">
          <Text data-testid="text" color={labelColor} lineHeight="caption">
            {label}
          </Text>
        </Box>
      )}
    </label>
  );
};

Toggle.displayName = "Toggle";
Toggle.Skeleton = ToggleSkeleton;
Toggle.Skeleton.displayName = "Toggle.Skeleton";

export { Toggle };
