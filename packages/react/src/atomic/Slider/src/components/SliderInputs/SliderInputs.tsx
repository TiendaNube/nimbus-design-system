import React, { memo } from "react";
import type { ChangeEvent } from "react";
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
  onMinChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onMaxChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SliderInputs: React.FC<SliderInputsProps> = ({
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
  onMinChange,
  onMaxChange,
}) => (
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
        value={minValue}
        onChange={onMinChange}
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
        value={maxValue}
        onChange={onMaxChange}
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

SliderInputs.defaultProps = {
  minLabel: undefined,
  maxLabel: undefined,
  dataTestId: undefined,
};

export default memo(SliderInputs);
