import React, { useState, useEffect, useCallback } from "react";
import type { RefObject } from "react";

type DragTarget = "min" | "max" | null;

interface UseSliderDragProps {
  trackRef: RefObject<HTMLDivElement>;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  localMinValue: number;
  localMaxValue: number;
  clampValue: (value: number, isMin: boolean) => number;
  updateValues: (newMin: number, newMax: number, isEnd?: boolean) => void;
  setLocalMinValue: (value: number) => void;
  setLocalMaxValue: (value: number) => void;
  onChange?: (minValue: number, maxValue: number) => void;
  onMinChange?: (value: number) => void;
  onMaxChange?: (value: number) => void;
  onChangeEnd?: (minValue: number, maxValue: number) => void;
}

interface UseSliderDragReturn {
  isDragging: DragTarget;
  handleTrackMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleThumbMouseDown: (
    type: "min" | "max"
  ) => (e: React.MouseEvent | React.TouchEvent) => void;
}

export const useSliderDrag = ({
  trackRef,
  min,
  max,
  step,
  disabled,
  localMinValue,
  localMaxValue,
  clampValue,
  updateValues,
  setLocalMinValue,
  setLocalMaxValue,
  onChange,
  onMinChange,
  onMaxChange,
  onChangeEnd,
}: UseSliderDragProps): UseSliderDragReturn => {
  const [isDragging, setIsDragging] = useState<DragTarget>(null);

  const snapToStep = useCallback(
    (value: number): number => {
      const snapped = Math.round((value - min) / step) * step + min;
      return Math.max(min, Math.min(max, snapped));
    },
    [min, max, step]
  );

  const getValueFromPosition = useCallback(
    (clientX: number): number => {
      if (!trackRef.current) return min;

      const rect = trackRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width)
      );
      const rawValue = min + percentage * (max - min);
      return snapToStep(rawValue);
    },
    [min, max, snapToStep, trackRef]
  );

  const handleTrackMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;

      const value = getValueFromPosition(e.clientX);
      const distanceToMin = Math.abs(value - localMinValue);
      const distanceToMax = Math.abs(value - localMaxValue);
      const isCloserToMin = distanceToMin <= distanceToMax;

      if (isCloserToMin) {
        const clamped = clampValue(value, true);
        setIsDragging("min");
        updateValues(clamped, localMaxValue);
      } else {
        const clamped = clampValue(value, false);
        setIsDragging("max");
        updateValues(localMinValue, clamped);
      }
    },
    [
      disabled,
      getValueFromPosition,
      localMinValue,
      localMaxValue,
      clampValue,
      updateValues,
    ]
  );

  const handleThumbMouseDown = useCallback(
    (type: "min" | "max") => (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      e.stopPropagation();
      setIsDragging(type);
    },
    [disabled]
  );

  useEffect(() => {
    if (!isDragging) return undefined;

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const value = getValueFromPosition(clientX);

      if (isDragging === "min") {
        const clamped = clampValue(value, true);
        setLocalMinValue(clamped);
        onChange?.(clamped, localMaxValue);
        onMinChange?.(clamped);
      } else {
        const clamped = clampValue(value, false);
        setLocalMaxValue(clamped);
        onChange?.(localMinValue, clamped);
        onMaxChange?.(clamped);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
      onChangeEnd?.(localMinValue, localMaxValue);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [
    isDragging,
    getValueFromPosition,
    clampValue,
    localMinValue,
    localMaxValue,
    setLocalMinValue,
    setLocalMaxValue,
    onChange,
    onMinChange,
    onMaxChange,
    onChangeEnd,
  ]);

  return {
    isDragging,
    handleTrackMouseDown,
    handleThumbMouseDown,
  };
};
