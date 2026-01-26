import React from "react";

interface KeyboardNavigationParams {
  event: React.KeyboardEvent;
  currentIndex: number;
  totalOptions: number;
  optionRefs: React.RefObject<Map<number, HTMLButtonElement>>;
}

/**
 * Handles keyboard navigation (ArrowUp/ArrowDown) for time picker columns.
 * Wraps around the list.
 */
export function handleColumnKeyDown({
  event,
  currentIndex,
  totalOptions,
  optionRefs,
}: KeyboardNavigationParams): void {
  switch (event.key) {
    case "ArrowUp": {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + totalOptions) % totalOptions;
      optionRefs.current?.get(prevIndex)?.focus();
      break;
    }
    case "ArrowDown": {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % totalOptions;
      optionRefs.current?.get(nextIndex)?.focus();
      break;
    }
    default:
      break;
  }
}
