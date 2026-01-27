import { useState, useCallback, useMemo } from "react";
import {
  parseTimeString,
  formatTimeValue,
  padZero,
} from "../../utils/timeUtils";
import type { TimeValue, AmPm } from "../../timePicker.types";
import type {
  UseTimePickerStateProps,
  UseTimePickerStateReturn,
} from "./useTimePickerState.types";

export function useTimePickerState({
  value,
  format,
  step,
}: UseTimePickerStateProps): UseTimePickerStateReturn {
  const [internalValue, setInternalValue] = useState<Partial<TimeValue>>({});
  const initialValue = useMemo(
    () => parseTimeString(value, format),
    [value, format]
  );

  const setHours = useCallback(
    (hours: number) => {
      setInternalValue((prev) => ({
        ...prev,
        hours,
      }));
    },
    [setInternalValue]
  );

  const setMinutes = useCallback(
    (minutes: number) => {
      setInternalValue((prev) => ({
        ...prev,
        minutes,
      }));
    },
    [setInternalValue]
  );

  const setAmPm = useCallback(
    (ampm: AmPm) => {
      if (format === "12h") {
        setInternalValue((prev) => ({
          ...prev,
          ampm,
        }));
      }
    },
    [format, setInternalValue]
  );

  const selectTime = useCallback(
    (hours: number, minutes: number, ampm?: AmPm) => {
      setInternalValue((prev) => ({
        ...prev,
        hours,
        minutes,
        ampm: format === "12h" ? ampm : undefined,
      }));
    },
    [format, setInternalValue]
  );

  const clear = useCallback(() => {
    setInternalValue({});
  }, [setInternalValue]);

  const hourOptions = useMemo(
    (): number[] =>
      format === "12h"
        ? [12, ...Array.from({ length: 11 }, (_, i) => i + 1)]
        : Array.from({ length: 24 }, (_, i) => i),
    [format]
  );

  const minuteOptions = useMemo(
    (): number[] =>
      Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step).filter(
        (minute) => minute < 60
      ),
    [step]
  );

  const dropdownOptions = useMemo(() => {
    if (format === "24h") {
      return hourOptions.flatMap((h) =>
        minuteOptions.map((m) => ({
          value: `${padZero(h)}:${padZero(m)}`,
          hours: h,
          minutes: m,
        }))
      );
    }

    return (["AM", "PM"] as AmPm[]).flatMap((ampm) =>
      hourOptions.flatMap((h) =>
        minuteOptions.map((m) => ({
          value: `${padZero(h)}:${padZero(m)} ${ampm}`,
          hours: h,
          minutes: m,
          ampm,
        }))
      )
    );
  }, [format, hourOptions, minuteOptions]);

  const displayValue = useMemo(
    () => formatTimeValue(initialValue, format),
    [initialValue, format]
  );

  return {
    initialValue,
    timeValue: internalValue,
    displayValue,
    setHours,
    setMinutes,
    setAmPm,
    selectTime,
    clear,
    hourOptions,
    minuteOptions,
    dropdownOptions,
  };
}
