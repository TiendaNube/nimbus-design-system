import React, { memo, useState, useEffect, useCallback } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { slider } from "@nimbus-ds/styles";
import { Input } from "@nimbus-ds/input";
import { Text } from "@nimbus-ds/text";
import { Box } from "@nimbus-ds/box";

export interface SliderInputsProps {
  minValue: number;
  maxValue: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  minLabel?: string;
  maxLabel?: string;
  separator: string;
  dataTestId?: string;
  onMinCommit: (value: number) => void;
  onMaxCommit: (value: number) => void;
}

const SliderInputsComponent: React.FC<SliderInputsProps> = ({
  minValue,
  maxValue,
  min,
  max,
  step,
  disabled,
  minLabel,
  maxLabel,
  separator,
  dataTestId,
  onMinCommit,
  onMaxCommit,
}) => {
  const [localMinInput, setLocalMinInput] = useState(String(minValue));
  const [localMaxInput, setLocalMaxInput] = useState(String(maxValue));

  useEffect(() => {
    setLocalMinInput(String(minValue));
  }, [minValue]);

  useEffect(() => {
    setLocalMaxInput(String(maxValue));
  }, [maxValue]);

  const commitMinValue = useCallback(() => {
    const parsed = Number(localMinInput);
    if (Number.isNaN(parsed) || localMinInput.trim() === "") {
      setLocalMinInput(String(minValue));
      return;
    }
    onMinCommit(parsed);
  }, [localMinInput, minValue, onMinCommit]);

  const commitMaxValue = useCallback(() => {
    const parsed = Number(localMaxInput);
    if (Number.isNaN(parsed) || localMaxInput.trim() === "") {
      setLocalMaxInput(String(maxValue));
      return;
    }
    onMaxCommit(parsed);
  }, [localMaxInput, maxValue, onMaxCommit]);

  const handleMinChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLocalMinInput(e.target.value);
  }, []);

  const handleMaxChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLocalMaxInput(e.target.value);
  }, []);

  const handleMinBlur = useCallback(() => {
    commitMinValue();
  }, [commitMinValue]);

  const handleMaxBlur = useCallback(() => {
    commitMaxValue();
  }, [commitMaxValue]);

  const handleMinKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        commitMinValue();
      }
    },
    [commitMinValue]
  );

  const handleMaxKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        commitMaxValue();
      }
    },
    [commitMaxValue]
  );

  return (
    <div className={slider.classnames.inputsContainer}>
      <div className={slider.classnames.inputWrapper}>
        {minLabel && (
          <Box marginBottom="1">
            <Text fontSize="caption" color="neutral-textLow">
              {minLabel}
            </Text>
          </Box>
        )}
        <Input
          type="number"
          value={localMinInput}
          onChange={handleMinChange}
          onBlur={handleMinBlur}
          onKeyDown={handleMinKeyDown}
          disabled={disabled}
          min={min}
          max={maxValue - step}
          step={step}
          data-testid={dataTestId ? `${dataTestId}-min-input` : undefined}
          aria-label={minLabel ?? "Minimum value"}
        />
      </div>

      <div className={slider.classnames.inputSeparator}>{separator}</div>

      <div className={slider.classnames.inputWrapper}>
        {maxLabel && (
          <Box marginBottom="1">
            <Text fontSize="caption" color="neutral-textLow">
              {maxLabel}
            </Text>
          </Box>
        )}
        <Input
          type="number"
          value={localMaxInput}
          onChange={handleMaxChange}
          onBlur={handleMaxBlur}
          onKeyDown={handleMaxKeyDown}
          disabled={disabled}
          min={minValue + step}
          max={max}
          step={step}
          data-testid={dataTestId ? `${dataTestId}-max-input` : undefined}
          aria-label={maxLabel ?? "Maximum value"}
        />
      </div>
    </div>
  );
};

SliderInputsComponent.defaultProps = {
  minLabel: undefined,
  maxLabel: undefined,
  dataTestId: undefined,
};

export const SliderInputs = memo(SliderInputsComponent);
