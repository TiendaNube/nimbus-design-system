import React from "react";
import { Text } from "@nimbus-ds/text";
import { toggle } from "@nimbus-ds/styles";

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
}: ToggleProps) => (
  <label htmlFor={id || name} className={toggle.classnames.container}>
    <input
      {...rest}
      id={id || name}
      name={name}
      type="checkbox"
      className={toggle.classnames.container__input}
      defaultChecked={active}
      disabled={disabled}
    />
    <span
      data-testid="slider"
      className={toggle.classnames.container__slider}
    />
    {label && (
      <Text
        data-testid="text"
        color={disabled ? "neutral-textDisabled" : "neutral-textHigh"}
      >
        {label}
      </Text>
    )}
  </label>
);

Toggle.displayName = "Toggle";
Toggle.Skeleton = ToggleSkeleton;
Toggle.Skeleton.displayName = "Toggle.Skeleton";

export { Toggle };
