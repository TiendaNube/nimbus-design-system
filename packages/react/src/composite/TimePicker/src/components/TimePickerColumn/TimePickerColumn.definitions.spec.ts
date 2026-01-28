import type React from "react";

import {
  handleColumnKeyDown,
  buildSingleOptions,
  buildCombinedOptions,
} from "./TimePickerColumn.definitions";
import type { DropdownOption } from "../../timePicker.types";

const createMockKeyboardEvent = (
  key: string,
  shiftKey = false
): React.KeyboardEvent => {
  const prevented = { value: false };
  return {
    key,
    shiftKey,
    preventDefault: () => {
      prevented.value = true;
    },
    get defaultPrevented() {
      return prevented.value;
    },
  } as unknown as React.KeyboardEvent;
};

const createMockOptionRefs = (focusedIndices: number[] = []) => {
  const focusCalls: number[] = [];
  const mockMap = new Map<number, HTMLButtonElement>();

  focusedIndices.forEach((index) => {
    mockMap.set(index, {
      focus: () => {
        focusCalls.push(index);
      },
    } as HTMLButtonElement);
  });

  return {
    ref: { current: mockMap } as React.RefObject<
      Map<number, HTMLButtonElement>
    >,
    getFocusCalls: () => focusCalls,
  };
};

describe("GIVEN handleColumnKeyDown", () => {
  describe("WHEN navigating with ArrowDown", () => {
    it("THEN moves focus to next option and wraps to first at end", () => {
      const totalOptions = 5;
      const { ref, getFocusCalls } = createMockOptionRefs([0, 1, 2, 3, 4]);

      handleColumnKeyDown({
        event: createMockKeyboardEvent("ArrowDown"),
        currentIndex: 2,
        totalOptions,
        optionRefs: ref,
      });

      expect(getFocusCalls()).toContain(3);

      handleColumnKeyDown({
        event: createMockKeyboardEvent("ArrowDown"),
        currentIndex: 4,
        totalOptions,
        optionRefs: ref,
      });

      expect(getFocusCalls()).toContain(0);
    });
  });

  describe("WHEN navigating with ArrowUp", () => {
    it("THEN moves focus to previous option and wraps to last at beginning", () => {
      const totalOptions = 5;
      const { ref, getFocusCalls } = createMockOptionRefs([0, 1, 2, 3, 4]);

      handleColumnKeyDown({
        event: createMockKeyboardEvent("ArrowUp"),
        currentIndex: 2,
        totalOptions,
        optionRefs: ref,
      });

      expect(getFocusCalls()).toContain(1);

      handleColumnKeyDown({
        event: createMockKeyboardEvent("ArrowUp"),
        currentIndex: 0,
        totalOptions,
        optionRefs: ref,
      });

      expect(getFocusCalls()).toContain(4);
    });
  });

  describe("WHEN pressing Tab keys", () => {
    it("THEN Tab calls onTabNext when provided", () => {
      const onTabNext = jest.fn();
      const { ref } = createMockOptionRefs([]);

      handleColumnKeyDown({
        event: createMockKeyboardEvent("Tab"),
        currentIndex: 0,
        totalOptions: 5,
        optionRefs: ref,
        onTabNext,
      });

      expect(onTabNext).toHaveBeenCalled();
    });

    it("THEN Shift+Tab calls onTabPrev when provided", () => {
      const onTabPrev = jest.fn();
      const { ref } = createMockOptionRefs([]);

      handleColumnKeyDown({
        event: createMockKeyboardEvent("Tab", true),
        currentIndex: 0,
        totalOptions: 5,
        optionRefs: ref,
        onTabPrev,
      });

      expect(onTabPrev).toHaveBeenCalled();
    });

    it("THEN allows default Tab behavior when handlers not provided", () => {
      const { ref } = createMockOptionRefs([]);
      const event = createMockKeyboardEvent("Tab");

      handleColumnKeyDown({
        event,
        currentIndex: 0,
        totalOptions: 5,
        optionRefs: ref,
      });

      expect(event.defaultPrevented).toBe(false);
    });
  });
});

describe("GIVEN buildSingleOptions", () => {
  it("THEN maps numbers to padded display values with correct state flags", () => {
    const options = [0, 5, 10];
    const onSelect = jest.fn();

    const result = buildSingleOptions(options, 5, 10, onSelect);

    expect(result).toHaveLength(3);

    expect(result[0]).toMatchObject({
      key: 0,
      displayValue: "00",
      isCurrent: false,
      isSelected: false,
    });

    expect(result[1]).toMatchObject({
      key: 5,
      displayValue: "05",
      isCurrent: true,
      isSelected: false,
    });

    expect(result[2]).toMatchObject({
      key: 10,
      displayValue: "10",
      isCurrent: false,
      isSelected: true,
    });
  });

  it("THEN onSelect callback triggers with correct value", () => {
    const onSelect = jest.fn();
    const result = buildSingleOptions([15, 30], undefined, undefined, onSelect);

    result[1].onSelect();

    expect(onSelect).toHaveBeenCalledWith(30);
  });
});

describe("GIVEN buildCombinedOptions", () => {
  const dropdownOptions: DropdownOption[] = [
    { value: "09:00", hours: 9, minutes: 0 },
    { value: "09:30", hours: 9, minutes: 30 },
    { value: "02:00 PM", hours: 2, minutes: 0, ampm: "PM" },
  ];

  it("THEN maps dropdown options to OptionItems with correct state", () => {
    const onSelectTime = jest.fn();

    const result = buildCombinedOptions(
      dropdownOptions,
      "09:00",
      "09:30",
      onSelectTime
    );

    expect(result).toHaveLength(3);

    expect(result[0]).toMatchObject({
      key: "09:00",
      displayValue: "09:00",
      isCurrent: true,
      isSelected: false,
    });

    expect(result[1]).toMatchObject({
      key: "09:30",
      displayValue: "09:30",
      isCurrent: false,
      isSelected: true,
    });
  });

  it("THEN onSelectTime callback passes hours, minutes and ampm", () => {
    const onSelectTime = jest.fn();
    const result = buildCombinedOptions(
      dropdownOptions,
      null,
      null,
      onSelectTime
    );

    result[2].onSelect();

    expect(onSelectTime).toHaveBeenCalledWith(2, 0, "PM");
  });
});
