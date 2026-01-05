import { useState, useEffect, useCallback } from "react";

interface UseSliderValuesProps {
  minValue: number;
  maxValue: number;
  min: number;
  max: number;
  step: number;
  onChange?: (minValue: number, maxValue: number) => void;
  onMinChange?: (value: number) => void;
  onMaxChange?: (value: number) => void;
  onChangeEnd?: (minValue: number, maxValue: number) => void;
}

interface UseSliderValuesReturn {
  localMinValue: number;
  localMaxValue: number;
  setLocalMinValue: (value: number) => void;
  setLocalMaxValue: (value: number) => void;
  clampValue: (value: number, isMin: boolean) => number;
  updateValues: (newMin: number, newMax: number, isEnd?: boolean) => void;
  getPercentage: (value: number) => number;
}

export const useSliderValues = ({
  minValue,
  maxValue,
  min,
  max,
  step,
  onChange,
  onMinChange,
  onMaxChange,
  onChangeEnd,
}: UseSliderValuesProps): UseSliderValuesReturn => {
  const [localMinValue, setLocalMinValue] = useState(minValue);
  const [localMaxValue, setLocalMaxValue] = useState(maxValue);

  useEffect(() => {
    setLocalMinValue(minValue);
  }, [minValue]);

  useEffect(() => {
    setLocalMaxValue(maxValue);
  }, [maxValue]);

  const clampValue = useCallback(
    (value: number, isMin: boolean): number => {
      if (isMin) {
        return Math.max(min, Math.min(value, localMaxValue - step));
      }
      return Math.min(max, Math.max(value, localMinValue + step));
    },
    [min, max, step, localMinValue, localMaxValue]
  );

  const getPercentage = useCallback(
    (value: number): number => ((value - min) / (max - min)) * 100,
    [min, max]
  );

  const updateValues = useCallback(
    (newMin: number, newMax: number, isEnd = false) => {
      setLocalMinValue(newMin);
      setLocalMaxValue(newMax);
      onChange?.(newMin, newMax);
      onMinChange?.(newMin);
      onMaxChange?.(newMax);

      if (isEnd) {
        onChangeEnd?.(newMin, newMax);
      }
    },
    [onChange, onMinChange, onMaxChange, onChangeEnd]
  );

  return {
    localMinValue,
    localMaxValue,
    setLocalMinValue,
    setLocalMaxValue,
    clampValue,
    updateValues,
    getPercentage,
  };
};
