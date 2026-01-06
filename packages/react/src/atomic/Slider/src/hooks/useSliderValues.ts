import { useState, useEffect, useCallback, useRef } from "react";

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

  const minValueRef = useRef(localMinValue);
  const maxValueRef = useRef(localMaxValue);

  useEffect(() => {
    minValueRef.current = localMinValue;
    maxValueRef.current = localMaxValue;
  }, [localMinValue, localMaxValue]);

  useEffect(() => {
    setLocalMinValue(minValue);
    setLocalMaxValue(maxValue);
  }, [minValue, maxValue]);

  const clampValue = useCallback(
    (value: number, isMin: boolean): number => {
      if (isMin) {
        return Math.max(min, Math.min(value, maxValueRef.current - step));
      }
      return Math.min(max, Math.max(value, minValueRef.current + step));
    },
    [min, max, step]
  );

  const getPercentage = useCallback(
    (value: number): number => {
      const range = max - min;
      return range === 0 ? 0 : ((value - min) / range) * 100;
    },
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
    clampValue,
    updateValues,
    getPercentage,
  };
};
