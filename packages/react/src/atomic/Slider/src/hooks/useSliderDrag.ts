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

type DragTarget = "min" | "max" | null;

interface UseSliderDragProps {
  trackRef: RefObject<HTMLDivElement>;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  localMinValue: number;
  localMaxValue: number;
  clampValue: (
    value: number,
    isMin: boolean,
    currentMin?: number,
    currentMax?: number
  ) => number;
  updateValues: (newMin: number, newMax: number, isEnd?: boolean) => void;
}

interface UseSliderDragReturn {
  isDragging: DragTarget;
  dragMinValue: number | null;
  dragMaxValue: number | null;
  handleTrackMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMinMouseDown: (e: React.MouseEvent | React.TouchEvent) => void;
  handleMaxMouseDown: (e: React.MouseEvent | React.TouchEvent) => void;
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
}: UseSliderDragProps): UseSliderDragReturn => {
  const [isDragging, setIsDragging] = useState<DragTarget>(null);
  const [dragMinValue, setDragMinValue] = useState<number | null>(null);
  const [dragMaxValue, setDragMaxValue] = useState<number | null>(null);

  const dragTargetRef = useRef<DragTarget>(null);
  const minValueRef = useRef(localMinValue);
  const maxValueRef = useRef(localMaxValue);
  const trackRectRef = useRef<TrackRect | null>(null);
  const lastOnChangeTimeRef = useRef<number>(0);
  const lastReportedMinRef = useRef<number | null>(null);
  const lastReportedMaxRef = useRef<number | null>(null);

  useEffect(() => {
    if (!dragTargetRef.current) {
      minValueRef.current = localMinValue;
      maxValueRef.current = localMaxValue;
    }
  }, [localMinValue, localMaxValue]);

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

      const value = getValueFromPosition(e.clientX);
      const currentMin = minValueRef.current;
      const currentMax = maxValueRef.current;
      const distanceToMin = Math.abs(value - currentMin);
      const distanceToMax = Math.abs(value - currentMax);
      const isCloserToMin = distanceToMin <= distanceToMax;

      if (isCloserToMin) {
        const clamped = clampValue(value, true, currentMin, currentMax);
        dragTargetRef.current = "min";
        setIsDragging("min");
        minValueRef.current = clamped;
        setDragMinValue(clamped);
        updateValues(clamped, currentMax);
      } else {
        const clamped = clampValue(value, false, currentMin, currentMax);
        dragTargetRef.current = "max";
        setIsDragging("max");
        maxValueRef.current = clamped;
        setDragMaxValue(clamped);
        updateValues(currentMin, clamped);
      }
    },
    [disabled, getValueFromPosition, clampValue, updateValues]
  );

  const createThumbMouseDownHandler = useCallback(
    (target: "min" | "max") => (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      e.stopPropagation();
      dragTargetRef.current = target;
      setIsDragging(target);
    },
    [disabled]
  );

  const handleMinMouseDown = createThumbMouseDownHandler("min");
  const handleMaxMouseDown = createThumbMouseDownHandler("max");

  useEffect(() => {
    if (!isDragging) return undefined;

    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      trackRectRef.current = { left: rect.left, width: rect.width };
    }

    const processMove = (clientX: number) => {
      if (!trackRectRef.current) return;

      const value = getValueFromClientX(clientX, trackRectRef.current);
      const isMin = dragTargetRef.current === "min";
      const currentMin = minValueRef.current;
      const currentMax = maxValueRef.current;
      const clampedValue = clampValue(value, isMin, currentMin, currentMax);

      if (isMin && clampedValue !== currentMin) {
        minValueRef.current = clampedValue;
        setDragMinValue(clampedValue);
      } else if (!isMin && clampedValue !== currentMax) {
        maxValueRef.current = clampedValue;
        setDragMaxValue(clampedValue);
      }

      const now = Date.now();
      if (now - lastOnChangeTimeRef.current >= DRAG_THROTTLE_MS) {
        lastOnChangeTimeRef.current = now;
        lastReportedMinRef.current = minValueRef.current;
        lastReportedMaxRef.current = maxValueRef.current;
        updateValues(minValueRef.current, maxValueRef.current, false);
      }
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const clientX = getClientXFromEvent(e);
      processMove(clientX);
    };

    const handleMouseUp = () => {
      trackRectRef.current = null;

      const finalMin = minValueRef.current;
      const finalMax = maxValueRef.current;

      dragTargetRef.current = null;
      setIsDragging(null);
      setDragMinValue(null);
      setDragMaxValue(null);

      const needsUpdate =
        lastReportedMinRef.current !== finalMin ||
        lastReportedMaxRef.current !== finalMax;

      lastOnChangeTimeRef.current = 0;
      lastReportedMinRef.current = null;
      lastReportedMaxRef.current = null;

      if (needsUpdate) {
        updateValues(finalMin, finalMax, false);
      }
      updateValues(finalMin, finalMax, true);
    };

    attachDragListeners({ handleMouseMove, handleMouseUp });

    return () => {
      removeDragListeners({ handleMouseMove, handleMouseUp });
    };
  }, [isDragging, trackRef, getValueFromClientX, clampValue, updateValues]);

  return {
    isDragging,
    dragMinValue,
    dragMaxValue,
    handleTrackMouseDown,
    handleMinMouseDown,
    handleMaxMouseDown,
  };
};
