import React, { useMemo } from "react";
import { Icon } from "@nimbus-ds/icon";
import { Text } from "@nimbus-ds/text";
import { checkbox } from "@nimbus-ds/styles";

import CheckIcon from "./checkbox-check.svg";
import IndeterminateIcon from "./checkbox-indeterminate.svg";
import { CheckboxProps, CheckboxComponents } from "./checkbox.types";
import { CheckboxSkeleton } from "./components";
import { borderColors, textColors } from "./checkbox.definitions";

const Checkbox: React.FC<CheckboxProps> & CheckboxComponents = ({
  className: _className,
  style: _style,
  appearance = "primary",
  indeterminate = false,
  label,
  id,
  name,
  disabled,
  ...rest
}: CheckboxProps) => {
  const borderColor = useMemo(
    () => borderColors[(indeterminate && "indeterminate") || appearance],
    [indeterminate, appearance]
  );

  const textColor = useMemo(
    () =>
      textColors[
        (disabled && "disabled") ||
          (indeterminate && "indeterminate") ||
          appearance
      ],
    [indeterminate, appearance, disabled]
  );

  return (
    <label
      htmlFor={id || name}
      className={[
        checkbox.style.container,
        checkbox.sprinkle({
          cursor: disabled ? "auto" : "pointer",
        }),
      ].join(" ")}
    >
      <input
        {...rest}
        id={id || name}
        name={name}
        type="checkbox"
        className={checkbox.style.input}
        disabled={disabled}
      />
      <span
        data-testid="checkmark"
        className={[
          checkbox.style.checkmark,
          checkbox.sprinkle({
            borderColor,
          }),
        ].join(" ")}
      >
        <div className={checkbox.style.checkicon}>
          <Icon
            data-testid="icon-check"
            color={disabled ? "neutral.textLow" : "neutral.background"}
            source={<CheckIcon />}
          />
        </div>
        {indeterminate && (
          <div className={checkbox.style.checkindeterminate}>
            <Icon
              data-testid="icon-indeterminate"
              source={<IndeterminateIcon />}
            />
          </div>
        )}
      </span>
      {label && (
        <Text
          data-testid="text"
          color={textColor}
          fontSize="base"
          lineHeight="base"
        >
          {label}
        </Text>
      )}
    </label>
  );
};

Checkbox.Skeleton = CheckboxSkeleton;
Checkbox.displayName = "Checkbox";

export { Checkbox };
