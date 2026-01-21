/**
 * Shared utilities for slider drag hooks.
 * Provides common types, constants, and functions used by both
 * useSliderDrag (range slider) and useSingleSliderDrag (single slider).
 */

/** Throttle interval for onChange callbacks during drag (ms) */
export const DRAG_THROTTLE_MS = 50;

/** Cached track element dimensions for drag calculations */
export interface TrackRect {
  left: number;
  width: number;
}

/**
 * Creates a function that snaps a value to the nearest step within bounds.
 *
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @param step - Step increment
 * @returns Function that snaps a value to the nearest valid step
 */
export const createSnapToStep =
  (min: number, max: number, step: number) =>
  (value: number): number => {
    const snapped = Math.round((value - min) / step) * step + min;
    return Math.max(min, Math.min(max, snapped));
  };

/**
 * Creates a function that converts a clientX position to a slider value.
 *
 * @param min - Minimum slider value
 * @param max - Maximum slider value
 * @param snapToStep - Function to snap value to nearest step
 * @returns Function that converts clientX to a snapped slider value
 */
export const createGetValueFromClientX =
  (min: number, max: number, snapToStep: (v: number) => number) =>
  (clientX: number, rect: TrackRect): number => {
    const percentage = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width)
    );
    const rawValue = min + percentage * (max - min);
    return snapToStep(rawValue);
  };

/**
 * Extracts clientX from either a mouse or touch event.
 *
 * @param e - Mouse or touch event
 * @returns The clientX coordinate
 */
export const getClientXFromEvent = (e: MouseEvent | TouchEvent): number =>
  "touches" in e ? e.touches[0].clientX : e.clientX;

/** Event listener types for drag operations */
type DragEventListeners = {
  handleMouseMove: (e: MouseEvent | TouchEvent) => void;
  handleMouseUp: () => void;
};

/**
 * Attaches drag event listeners to the document.
 *
 * @param listeners - Object containing mousemove and mouseup handlers
 */
export const attachDragListeners = ({
  handleMouseMove,
  handleMouseUp,
}: DragEventListeners): void => {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("touchmove", handleMouseMove, { passive: true });
  document.addEventListener("touchend", handleMouseUp);
};

/**
 * Removes drag event listeners from the document.
 *
 * @param listeners - Object containing mousemove and mouseup handlers
 */
export const removeDragListeners = ({
  handleMouseMove,
  handleMouseUp,
}: DragEventListeners): void => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
  document.removeEventListener("touchmove", handleMouseMove);
  document.removeEventListener("touchend", handleMouseUp);
};
