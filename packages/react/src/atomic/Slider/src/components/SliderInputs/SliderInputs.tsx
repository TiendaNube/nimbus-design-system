import React, { memo, useState, useEffect, useCallback } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { slider } from "@nimbus-ds/styles";
import { Input } from "@nimbus-ds/input";
import { Text } from "@nimbus-ds/text";
import { Box } from "@nimbus-ds/box";

/**
 * Props for the SliderInputs component, which provides numeric input fields
 * for controlling the minimum and maximum values of a range slider.
 *
 * @property minValue - The current minimum value of the range. Must be >= min and < maxValue.
 * @property maxValue - The current maximum value of the range. Must be > minValue and <= max.
 * @property min - The absolute minimum allowed value for the range (lower bound constraint).
 * @property max - The absolute maximum allowed value for the range (upper bound constraint).
 * @property step - The increment/decrement step value for the inputs. Determines input granularity.
 * @property disabled - Whether the input fields are disabled and non-interactive.
 * @property minLabel - Optional label text displayed above the minimum value input field.
 * @property maxLabel - Optional label text displayed above the maximum value input field.
 * @property separator - The text or character displayed between the min and max input fields (e.g., "–" or "to").
 * @property dataTestId - Optional test ID prefix. When provided, inputs get `${dataTestId}-min-input` and `${dataTestId}-max-input`.
 * @property onMinCommit - Callback invoked when a valid minimum value is committed (on blur or Enter). Receives the parsed numeric value.
 * @property onMaxCommit - Callback invoked when a valid maximum value is committed (on blur or Enter). Receives the parsed numeric value.
 */
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

/**
 * SliderInputsComponent renders a pair of numeric input fields for controlling
 * the minimum and maximum values of a range slider.
 *
 * The component maintains local input state to allow free-form editing,
 * committing the parsed numeric value on blur or Enter key press.
 * Invalid inputs are reverted to the current prop value.
 *
 * @param minValue - The current minimum value of the range
 * @param maxValue - The current maximum value of the range
 * @param min - The absolute minimum allowed value
 * @param max - The absolute maximum allowed value
 * @param step - The increment/decrement step for the inputs
 * @param disabled - Whether the inputs are disabled
 * @param minLabel - Optional label displayed above the minimum input
 * @param maxLabel - Optional label displayed above the maximum input
 * @param separator - The separator text displayed between the two inputs
 * @param dataTestId - Optional test ID prefix for testing purposes
 * @param onMinCommit - Callback invoked when a valid minimum value is committed
 * @param onMaxCommit - Callback invoked when a valid maximum value is committed
 */
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

SliderInputsComponent.displayName = "SliderInputsComponent";

SliderInputsComponent.defaultProps = {
  minLabel: undefined,
  maxLabel: undefined,
  dataTestId: undefined,
};

export const SliderInputs = memo(SliderInputsComponent);
