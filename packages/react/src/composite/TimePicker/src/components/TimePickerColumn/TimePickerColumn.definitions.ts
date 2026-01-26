import React from "react";

interface KeyboardNavigationParams {
  event: React.KeyboardEvent;
  currentIndex: number;
  totalOptions: number;
  isDisabledAtIndex: (index: number) => boolean;
  optionRefs: React.RefObject<Map<number, HTMLButtonElement>>;
}

/**
 * Handles keyboard navigation (ArrowUp/ArrowDown) for time picker columns.
 * Wraps around the list and skips disabled options.
 */
export function handleColumnKeyDown({
  event,
  currentIndex,
  totalOptions,
  isDisabledAtIndex,
  optionRefs,
}: KeyboardNavigationParams): void {
  const findNextEnabledIndex = (
    startIndex: number,
    direction: "up" | "down"
  ): number => {
    let index = startIndex;
    const step = direction === "up" ? -1 : 1;

    for (let i = 0; i < totalOptions; i++) {
      index = (index + step + totalOptions) % totalOptions;
      if (!isDisabledAtIndex(index)) {
        return index;
      }
    }

    return startIndex;
  };

  switch (event.key) {
    case "ArrowUp": {
      event.preventDefault();
      const prevIndex = findNextEnabledIndex(currentIndex, "up");
      optionRefs.current?.get(prevIndex)?.focus();
      break;
    }
    case "ArrowDown": {
      event.preventDefault();
      const nextIndex = findNextEnabledIndex(currentIndex, "down");
      optionRefs.current?.get(nextIndex)?.focus();
      break;
    }
    default:
      break;
  }
}
