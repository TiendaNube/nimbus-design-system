import type React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import type { RefObject } from "react";

/** Throttle interval for onChange callbacks during drag (ms) */
const DRAG_THROTTLE_MS = 50;

type DragTarget = "min" | "max" | null;

interface TrackRect {
  left: number;
  width: number;
}

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

  const minValueRef = useRef(localMinValue);
  const maxValueRef = useRef(localMaxValue);
  const trackRectRef = useRef<TrackRect | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pendingClientXRef = useRef<number | null>(null);
  const lastOnChangeTimeRef = useRef<number>(0);
  const lastReportedMinRef = useRef<number | null>(null);
  const lastReportedMaxRef = useRef<number | null>(null);

  useEffect(() => {
    minValueRef.current = localMinValue;
    maxValueRef.current = localMaxValue;
  }, [localMinValue, localMaxValue]);

  const snapToStep = useCallback(
    (value: number): number => {
      const snapped = Math.round((value - min) / step) * step + min;
      return Math.max(min, Math.min(max, snapped));
    },
    [min, max, step]
  );

  const getValueFromClientX = useCallback(
    (clientX: number, rect: TrackRect): number => {
      const percentage = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width)
      );
      const rawValue = min + percentage * (max - min);
      return snapToStep(rawValue);
    },
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
        const clamped = clampValue(value, true);
        setIsDragging("min");
        updateValues(clamped, currentMax);
      } else {
        const clamped = clampValue(value, false);
        setIsDragging("max");
        updateValues(currentMin, clamped);
      }
    },
    [disabled, getValueFromPosition, clampValue, updateValues]
  );

  const handleMinMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      e.stopPropagation();
      setIsDragging("min");
    },
    [disabled]
  );

  const handleMaxMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      e.stopPropagation();
      setIsDragging("max");
    },
    [disabled]
  );

  useEffect(() => {
    if (!isDragging) return undefined;

    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      trackRectRef.current = { left: rect.left, width: rect.width };
    }

    const processMove = () => {
      rafIdRef.current = null;
      const clientX = pendingClientXRef.current;
      if (clientX === null || !trackRectRef.current) return;

      const value = getValueFromClientX(clientX, trackRectRef.current);

      if (isDragging === "min") {
        const clampedMin = clampValue(value, true);
        if (clampedMin === minValueRef.current) return;

        minValueRef.current = clampedMin;
        setDragMinValue(clampedMin);

        // Throttle updateValues calls to avoid excessive re-renders
        const now = Date.now();
        if (now - lastOnChangeTimeRef.current >= DRAG_THROTTLE_MS) {
          lastOnChangeTimeRef.current = now;
          lastReportedMinRef.current = clampedMin;
          lastReportedMaxRef.current = maxValueRef.current;
          updateValues(clampedMin, maxValueRef.current, false);
        }
      } else {
        const clampedMax = clampValue(value, false);
        if (clampedMax === maxValueRef.current) return;

        maxValueRef.current = clampedMax;
        setDragMaxValue(clampedMax);

        // Throttle updateValues calls to avoid excessive re-renders
        const now = Date.now();
        if (now - lastOnChangeTimeRef.current >= DRAG_THROTTLE_MS) {
          lastOnChangeTimeRef.current = now;
          lastReportedMinRef.current = minValueRef.current;
          lastReportedMaxRef.current = clampedMax;
          updateValues(minValueRef.current, clampedMax, false);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      pendingClientXRef.current =
        "touches" in e ? e.touches[0].clientX : e.clientX;

      rafIdRef.current ??= requestAnimationFrame(processMove);
    };

    const handleMouseUp = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      trackRectRef.current = null;
      pendingClientXRef.current = null;

      const finalMin = minValueRef.current;
      const finalMax = maxValueRef.current;

      setIsDragging(null);
      setDragMinValue(null);
      setDragMaxValue(null);

      // Ensure final values are reported if they weren't sent due to throttling
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

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleMouseMove, { passive: true });
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
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
