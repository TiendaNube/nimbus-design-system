import type React from "react";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import type { RefObject } from "react";
import {
  DRAG_THROTTLE_MS,
  type TrackRect,
  createSnapToStep,
  createGetValueFromClientX,
  getClientXFromEvent,
  attachDragListeners,
  removeDragListeners,
} from "./sliderDragUtils";

interface UseSingleSliderDragProps {
  trackRef: RefObject<HTMLDivElement>;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  value: number;
  clampValue: (value: number) => number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
}

interface UseSingleSliderDragReturn {
  isDragging: boolean;
  dragValue: number | null;
  handleTrackMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleThumbMouseDown: (e: React.MouseEvent | React.TouchEvent) => void;
}

export const useSingleSliderDrag = ({
  trackRef,
  min,
  max,
  step,
  disabled,
  value,
  clampValue,
  onChange,
  onChangeEnd,
}: UseSingleSliderDragProps): UseSingleSliderDragReturn => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState<number | null>(null);

  const isDraggingRef = useRef(false);
  const valueRef = useRef(value);
  const trackRectRef = useRef<TrackRect | null>(null);
  const lastOnChangeTimeRef = useRef<number>(0);
  const lastOnChangeValueRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isDraggingRef.current) {
      valueRef.current = value;
    }
  }, [value]);

  const snapToStep = useMemo(
    () => createSnapToStep(min, max, step),
    [min, max, step]
  );

  const getValueFromClientX = useMemo(
    () => createGetValueFromClientX(min, max, snapToStep),
    [min, max, snapToStep]
  );

  const getValueFromPosition = useCallback(
    (clientX: number): number => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      return getValueFromClientX(clientX, rect);
    },
    [min, trackRef, getValueFromClientX]
  );

  const handleTrackMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;

      const newValue = getValueFromPosition(e.clientX);
      const clamped = clampValue(newValue);

      isDraggingRef.current = true;
      setIsDragging(true);
      valueRef.current = clamped;
      setDragValue(clamped);
    },
    [disabled, getValueFromPosition, clampValue]
  );

  const handleThumbMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      e.stopPropagation();
      isDraggingRef.current = true;
      setIsDragging(true);
    },
    [disabled]
  );

  useEffect(() => {
    if (!isDragging) return undefined;

    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      trackRectRef.current = { left: rect.left, width: rect.width };
    }

    const processMove = (clientX: number) => {
      if (!trackRectRef.current) return;

      const newValue = getValueFromClientX(clientX, trackRectRef.current);
      const clamped = clampValue(newValue);
      const currentValue = valueRef.current;

      if (clamped !== currentValue) {
        valueRef.current = clamped;
        setDragValue(clamped);
      }

      const now = Date.now();
      if (now - lastOnChangeTimeRef.current >= DRAG_THROTTLE_MS) {
        lastOnChangeTimeRef.current = now;
        lastOnChangeValueRef.current = valueRef.current;
        onChange?.(valueRef.current);
      }
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const clientX = getClientXFromEvent(e);
      processMove(clientX);
    };

    const handleMouseUp = () => {
      trackRectRef.current = null;

      const finalValue = valueRef.current;

      isDraggingRef.current = false;
      setIsDragging(false);
      setDragValue(null);

      if (lastOnChangeValueRef.current !== finalValue) {
        onChange?.(finalValue);
      }
      lastOnChangeTimeRef.current = 0;
      lastOnChangeValueRef.current = null;

      onChangeEnd?.(finalValue);
    };

    attachDragListeners({ handleMouseMove, handleMouseUp });

    return () => {
      removeDragListeners({ handleMouseMove, handleMouseUp });
    };
  }, [
    isDragging,
    trackRef,
    getValueFromClientX,
    clampValue,
    onChange,
    onChangeEnd,
  ]);

  return {
    isDragging,
    dragValue,
    handleTrackMouseDown,
    handleThumbMouseDown,
  };
};
