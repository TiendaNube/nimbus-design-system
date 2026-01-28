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
  aiGenerated = false,
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

  const shouldApplyAI = aiGenerated && appearance !== "danger";

  return (
    <label
      htmlFor={id || name}
      className={[
        checkbox.classnames.container,
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
        className={checkbox.classnames.container__input}
        disabled={disabled}
      />
      <span
        data-testid="checkmark"
        className={[
          checkbox.classnames.container__checkmark,
          shouldApplyAI
            ? checkbox.classnames.aiGenerated
            : checkbox.sprinkle({
                borderColor,
              }),
        ].join(" ")}
      >
        <div className={checkbox.classnames.container__checkmark_checkicon}>
          <Icon
            data-testid="icon-check"
            color={disabled ? "neutral-textLow" : "neutral-background"}
            source={<CheckIcon />}
          />
        </div>
        {indeterminate && (
          <div
            className={
              checkbox.classnames.container__checkmark_checkindeterminate
            }
          >
            <Icon
              data-testid="icon-indeterminate"
              source={<IndeterminateIcon />}
            />
          </div>
        )}
      </span>
      {label && (
        <Text data-testid="text" color={textColor} lineHeight="caption">
          {label}
        </Text>
      )}
    </label>
  );
};

Checkbox.Skeleton = CheckboxSkeleton;
Checkbox.displayName = "Checkbox";
Checkbox.Skeleton.displayName = "Checkbox.Skeleton";

export { Checkbox };
