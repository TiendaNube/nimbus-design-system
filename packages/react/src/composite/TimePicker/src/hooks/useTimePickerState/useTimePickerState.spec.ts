import { renderHook, act } from "@testing-library/react";

import { useTimePickerState } from "./useTimePickerState";
import type { UseTimePickerStateProps } from "./useTimePickerState.types";

const makeSut = (props: UseTimePickerStateProps) =>
  renderHook(() => useTimePickerState(props));

describe("GIVEN useTimePickerState", () => {
  describe("WHEN initializing with no value", () => {
    it("THEN returns null initialValue and empty displayValue", () => {
      const { result } = makeSut({ format: "24h", step: 1 });

      expect(result.current.initialValue).toBeNull();
      expect(result.current.displayValue).toBe("");
      expect(result.current.timeValue).toBeNull();
    });
  });

  describe("WHEN initializing with a time string value", () => {
    it("THEN parses 24h format correctly", () => {
      const { result } = makeSut({ value: "14:30", format: "24h", step: 1 });

      expect(result.current.initialValue).toEqual({ hours: 14, minutes: 30 });
      expect(result.current.displayValue).toBe("14:30");
    });

    it("THEN parses 12h format correctly", () => {
      const { result } = makeSut({ value: "02:30 PM", format: "12h", step: 1 });

      expect(result.current.initialValue).toEqual({
        hours: 2,
        minutes: 30,
        ampm: "PM",
      });
      expect(result.current.displayValue).toBe("02:30 PM");
    });

    it("THEN converts 24h input to 12h format when needed", () => {
      const { result } = makeSut({ value: "14:30", format: "12h", step: 1 });

      expect(result.current.initialValue).toEqual({
        hours: 2,
        minutes: 30,
        ampm: "PM",
      });
    });
  });

  describe("WHEN generating hour options", () => {
    it("THEN returns 0-23 for 24h format", () => {
      const { result } = makeSut({ format: "24h", step: 1 });

      expect(result.current.hourOptions).toHaveLength(24);
      expect(result.current.hourOptions[0]).toBe(0);
      expect(result.current.hourOptions[23]).toBe(23);
    });

    it("THEN returns 12, 1-11 for 12h format (12 first for display)", () => {
      const { result } = makeSut({ format: "12h", step: 1 });

      expect(result.current.hourOptions).toHaveLength(12);
      expect(result.current.hourOptions[0]).toBe(12);
      expect(result.current.hourOptions.slice(1)).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
      ]);
    });
  });

  describe("WHEN generating minute options with different steps", () => {
    it("THEN returns 0-59 for step=1", () => {
      const { result } = makeSut({ format: "24h", step: 1 });

      expect(result.current.minuteOptions).toHaveLength(60);
      expect(result.current.minuteOptions[0]).toBe(0);
      expect(result.current.minuteOptions[59]).toBe(59);
    });

    it("THEN returns [0, 15, 30, 45] for step=15", () => {
      const { result } = makeSut({ format: "24h", step: 15 });

      expect(result.current.minuteOptions).toEqual([0, 15, 30, 45]);
    });

    it("THEN returns [0, 30] for step=30", () => {
      const { result } = makeSut({ format: "24h", step: 30 });

      expect(result.current.minuteOptions).toEqual([0, 30]);
    });
  });

  describe("WHEN generating dropdown options", () => {
    it("THEN creates all combinations of hours and minutes", () => {
      const { result } = makeSut({ format: "24h", step: 30 });

      expect(result.current.dropdownOptions).toHaveLength(48);
      expect(result.current.dropdownOptions[0]).toEqual({
        value: "00:00",
        hours: 0,
        minutes: 0,
      });
      expect(result.current.dropdownOptions[1]).toEqual({
        value: "00:30",
        hours: 0,
        minutes: 30,
      });
    });
  });

  describe("WHEN using setHours", () => {
    it("THEN updates only the hours field", () => {
      const { result } = makeSut({ format: "24h", step: 1 });

      act(() => {
        result.current.setHours(10);
      });

      expect(result.current.timeValue).toEqual({ hours: 10 });
    });

    it("THEN preserves existing minutes when setting hours", () => {
      const { result } = makeSut({ format: "24h", step: 1 });

      act(() => {
        result.current.setMinutes(30);
        result.current.setHours(10);
      });

      expect(result.current.timeValue).toEqual({ hours: 10, minutes: 30 });
    });
  });

  describe("WHEN using setMinutes", () => {
    it("THEN updates only the minutes field", () => {
      const { result } = makeSut({ format: "24h", step: 1 });

      act(() => {
        result.current.setMinutes(45);
      });

      expect(result.current.timeValue).toEqual({ minutes: 45 });
    });
  });

  describe("WHEN using setAmPm", () => {
    it("THEN updates ampm field in 12h format", () => {
      const { result } = makeSut({ format: "12h", step: 1 });

      act(() => {
        result.current.setAmPm("PM");
      });

      expect(result.current.timeValue?.ampm).toBe("PM");
    });

    it("THEN ignores ampm changes in 24h format", () => {
      const { result } = makeSut({ format: "24h", step: 1 });

      act(() => {
        result.current.setAmPm("PM");
      });

      expect(result.current.timeValue).toBeNull();
    });
  });

  describe("WHEN using selectTime", () => {
    it("THEN sets all time fields at once in 24h format", () => {
      const { result } = makeSut({ format: "24h", step: 1 });

      act(() => {
        result.current.selectTime(14, 30);
      });

      expect(result.current.timeValue).toEqual({
        hours: 14,
        minutes: 30,
      });
    });

    it("THEN sets all time fields including ampm in 12h format", () => {
      const { result } = makeSut({ format: "12h", step: 1 });

      act(() => {
        result.current.selectTime(2, 30);
      });

      expect(result.current.timeValue).toEqual({
        hours: 2,
        minutes: 30,
      });
    });
  });

  describe("WHEN using clear", () => {
    it("THEN resets timeValue to null", () => {
      const { result } = makeSut({ format: "24h", step: 1 });

      act(() => {
        result.current.selectTime(10, 30);
      });
      expect(result.current.timeValue).not.toBeNull();

      act(() => {
        result.current.clear();
      });
      expect(result.current.timeValue).toBeNull();
    });
  });
});
