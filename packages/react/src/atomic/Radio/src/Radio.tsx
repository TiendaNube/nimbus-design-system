import React, { useMemo } from "react";
import { Text } from "@nimbus-ds/text";
import { radio } from "@nimbus-ds/styles";

import type { RadioProps, RadioComponents } from "./radio.types";
import { RadioSkeleton } from "./components";

const Radio: React.FC<RadioProps> & RadioComponents = ({
  className: _className,
  style: _style,
  as = "radio",
  label,
  id,
  name,
  disabled,
  ...rest
}: RadioProps) => {
  const isRadio = useMemo(() => as === "radio", [as]);
  const isDisabled = useMemo(() => disabled && !isRadio, [isRadio, disabled]);

  return (
    <label
      htmlFor={id || name}
      className={[
        radio.classnames.container,
        radio.sprinkle({ cursor: disabled ? "auto" : "pointer" }),
      ].join(" ")}
    >
      <input
        {...rest}
        id={id || name}
        name={name}
        type="radio"
        className={radio.classnames.container__input}
        disabled={disabled}
      />
      {isRadio && (
        <span
          data-testid="checkmark-element"
          className={radio.classnames.container__checkmark}
        >
          <div
            data-testid="checkicon-element"
            className={radio.classnames.container__checkicon}
          />
        </span>
      )}
      {label && (
        <div
          data-testid="content-element"
          className={
            radio.classnames.container__content[isDisabled ? "disabled" : as]
          }
        >
          <Text
            data-testid="text"
            color="currentColor"
            fontSize={isRadio ? "base" : "caption"}
            lineHeight="caption"
          >
            {label}
          </Text>
        </div>
      )}
    </label>
  );
};

Radio.Skeleton = RadioSkeleton;
Radio.displayName = "Radio";
Radio.Skeleton.displayName = "Radio.Skeleton";

export { Radio };
