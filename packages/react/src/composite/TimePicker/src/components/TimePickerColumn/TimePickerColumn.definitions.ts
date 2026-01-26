import React from "react";

interface KeyboardNavigationParams {
  event: React.KeyboardEvent;
  currentIndex: number;
  totalOptions: number;
  optionRefs: React.RefObject<Map<number, HTMLButtonElement>>;
  onTabNext?: () => void;
  onTabPrev?: () => void;
}

/**
 * Handles keyboard navigation for time picker columns.
 * - ArrowUp/ArrowDown: Navigate within column (wraps around)
 * - Tab: Move to next column
 * - Shift+Tab: Move to previous column
 */
export function handleColumnKeyDown({
  event,
  currentIndex,
  totalOptions,
  optionRefs,
  onTabNext,
  onTabPrev,
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
    case "Tab": {
      if (event.shiftKey && onTabPrev) {
        event.preventDefault();
        onTabPrev();
      } else if (!event.shiftKey && onTabNext) {
        event.preventDefault();
        onTabNext();
      }
      break;
    }
    default:
      break;
  }
}
