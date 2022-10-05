import React, { useMemo } from "react";
import { Text } from "@nimbus-ds/text";
import { radio } from "@nimbus-ds/styles";

import { RadioProps, RadioComponents } from "./radio.types";
import { Skeleton } from "./components";

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
        radio.style.container,
        radio.sprinkle({ cursor: disabled ? "auto" : "pointer" }),
      ].join(" ")}
    >
      <input
        {...rest}
        id={id || name}
        name={name}
        type="radio"
        className={radio.style.input}
        disabled={disabled}
      />
      {isRadio && (
        <span data-testid="checkmark-element" className={radio.style.checkmark}>
          <div
            data-testid="checkicon-element"
            className={radio.style.checkicon}
          />
        </span>
      )}
      <div
        data-testid="content-element"
        className={radio.style.content[isDisabled ? "disabled" : as]}
      >
        {label && (
          <Text
            data-testid="text"
            color="currentColor"
            fontSize="base"
            lineHeight="highlight"
          >
            {label}
          </Text>
        )}
      </div>
    </label>
  );
};

Radio.Skeleton = Skeleton;
Radio.displayName = "Radio";

export { Radio };
