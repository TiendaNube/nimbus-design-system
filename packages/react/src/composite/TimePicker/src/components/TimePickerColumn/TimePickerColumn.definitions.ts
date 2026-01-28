import type React from "react";
import { padZero } from "../../utils/timeUtils";
import type { OptionItem } from "./TimePickerColumn.types";
import type { DropdownOption } from "../../timePicker.types";

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
function handleColumnKeyDown({
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

function buildSingleOptions(
  options: number[],
  value: number | undefined,
  selected: number | undefined,
  onSelect: (value: number) => void
): OptionItem[] {
  return options.map((itemValue) => ({
    key: itemValue,
    displayValue: padZero(itemValue),
    isCurrent: itemValue === value,
    isSelected: itemValue === selected,
    onSelect: () => onSelect(itemValue),
  }));
}

function buildCombinedOptions(
  options: DropdownOption[],
  currentValue: string | null | undefined,
  selectedValue: string | null | undefined,
  onSelectTime: (hours: number, minutes: number, ampm?: "AM" | "PM") => void
): OptionItem[] {
  return options.map((option) => ({
    key: option.value,
    displayValue: option.value,
    isCurrent: option.value === currentValue,
    isSelected: option.value === selectedValue,
    onSelect: () => onSelectTime(option.hours, option.minutes, option.ampm),
  }));
}

export { buildSingleOptions, buildCombinedOptions, handleColumnKeyDown };
