import type React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import type { RefObject } from "react";

/** Throttle interval for onChange callbacks during drag (ms) */
const DRAG_THROTTLE_MS = 50;

interface TrackRect {
  left: number;
  width: number;
}

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

  const valueRef = useRef(value);
  const trackRectRef = useRef<TrackRect | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pendingClientXRef = useRef<number | null>(null);
  const lastOnChangeTimeRef = useRef<number>(0);
  const lastOnChangeValueRef = useRef<number | null>(null);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const snapToStep = useCallback(
    (val: number): number => {
      const snapped = Math.round((val - min) / step) * step + min;
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

      const newValue = getValueFromPosition(e.clientX);
      const clamped = clampValue(newValue);

      setIsDragging(true);
      setDragValue(clamped);
      valueRef.current = clamped;
    },
    [disabled, getValueFromPosition, clampValue]
  );

  const handleThumbMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      e.stopPropagation();
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

    const processMove = () => {
      rafIdRef.current = null;
      const clientX = pendingClientXRef.current;
      if (clientX === null || !trackRectRef.current) return;

      const newValue = getValueFromClientX(clientX, trackRectRef.current);
      const clamped = clampValue(newValue);

      if (clamped === valueRef.current) return;

      valueRef.current = clamped;
      setDragValue(clamped);

      // Throttle onChange calls to avoid excessive re-renders
      const now = Date.now();
      if (now - lastOnChangeTimeRef.current >= DRAG_THROTTLE_MS) {
        lastOnChangeTimeRef.current = now;
        lastOnChangeValueRef.current = clamped;
        onChange?.(clamped);
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

      const finalValue = valueRef.current;

      setIsDragging(false);
      setDragValue(null);

      // Ensure final value is reported if it wasn't sent due to throttling
      if (lastOnChangeValueRef.current !== finalValue) {
        onChange?.(finalValue);
      }
      lastOnChangeTimeRef.current = 0;
      lastOnChangeValueRef.current = null;

      onChangeEnd?.(finalValue);
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
