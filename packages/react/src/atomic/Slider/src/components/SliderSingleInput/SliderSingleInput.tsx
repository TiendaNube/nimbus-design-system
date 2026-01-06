import React, { memo, useState, useEffect, useCallback } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { slider } from "@nimbus-ds/styles";
import { Input } from "@nimbus-ds/input";
import { Text } from "@nimbus-ds/text";
import { Box } from "@nimbus-ds/box";

export interface SliderSingleInputProps {
  value: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  label?: string;
  dataTestId?: string;
  onCommit: (value: number) => void;
}

const SliderSingleInputComponent: React.FC<SliderSingleInputProps> = ({
  value,
  min,
  max,
  step,
  disabled,
  label,
  dataTestId,
  onCommit,
}) => {
  const [localInput, setLocalInput] = useState(String(value));

  useEffect(() => {
    setLocalInput(String(value));
  }, [value]);

  const commitValue = useCallback(() => {
    const parsed = Number(localInput);
    if (Number.isNaN(parsed) || localInput.trim() === "") {
      setLocalInput(String(value));
      return;
    }
    onCommit(parsed);
  }, [localInput, value, onCommit]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLocalInput(e.target.value);
  }, []);

  const handleBlur = useCallback(() => {
    commitValue();
  }, [commitValue]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        commitValue();
      }
    },
    [commitValue]
  );

  return (
    <div className={slider.classnames.inputsContainer}>
      <div className={slider.classnames.inputWrapper}>
        {label && (
          <Box marginBottom="1">
            <Text fontSize="caption" color="neutral-textLow">
              {label}
            </Text>
          </Box>
        )}
        <Input
          type="number"
          value={localInput}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          data-testid={dataTestId ? `${dataTestId}-input` : undefined}
          aria-label={label ?? "Value"}
        />
      </div>
    </div>
  );
};

SliderSingleInputComponent.defaultProps = {
  label: undefined,
  dataTestId: undefined,
};

export const SliderSingleInput = memo(SliderSingleInputComponent);
