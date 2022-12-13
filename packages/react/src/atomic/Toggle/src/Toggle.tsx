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
  ...rest
}: ToggleProps) => (
  <label htmlFor={id || name} className={toggle.style.container}>
    <input
      {...rest}
      id={id || name}
      name={name}
      type="checkbox"
      className={toggle.style.input}
      defaultChecked={active}
    />
    <span data-testid="slider" className={toggle.style.slider} />
    {label && (
      <Text
        data-testid="text"
        color="neutral.textLow"
        fontSize="base"
        lineHeight="highlight"
      >
        {label}
      </Text>
    )}
  </label>
);

Toggle.Skeleton = ToggleSkeleton;

export { Toggle };
