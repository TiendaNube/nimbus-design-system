import { useState, useCallback, useMemo } from "react";
import { TimeFormat, TimeValue, AmPm } from "../../timePicker.types";
import { parseTimeString, formatTimeValue, padZero } from "../../utils/timeUtils";

interface UseTimePickerStateProps {
  value?: string | Date | null;
  onChange?: (value: string | null, date: Date | null) => void;
  format: TimeFormat;
  step: number;
}

interface UseTimePickerStateReturn {
  initialValue: TimeValue | null;
  timeValue: Partial<TimeValue> | null;
  displayValue: string;
  setHours: (hours: number) => void;
  setMinutes: (minutes: number) => void;
  setAmPm: (ampm: AmPm) => void;
  selectTime: (hours: number, minutes: number, ampm?: AmPm) => void;
  clear: () => void;
  hourOptions: number[];
  minuteOptions: number[];
  dropdownOptions: Array<{
    value: string;
    hours: number;
    minutes: number;
    ampm?: AmPm;
  }>;
}

export function useTimePickerState({
  value,
  format,
  step,
}: UseTimePickerStateProps): UseTimePickerStateReturn {
  const [internalValue, setInternalValue] = useState<Partial<TimeValue>>({
    ampm: "AM",
  });
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
    setInternalValue({ ampm: "AM" });
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
    const options: Array<{
      value: string;
      hours: number;
      minutes: number;
      ampm?: AmPm;
    }> = [];

    if (format === "24h") {
      for (const h of hourOptions) {
        for (const m of minuteOptions) {
          options.push({
            value: `${padZero(h)}:${padZero(m)}`,
            hours: h,
            minutes: m,
          });
        }
      }
    } else {
      (["AM", "PM"] as AmPm[]).forEach((ampm) => {
        for (const h of hourOptions) {
          for (const m of minuteOptions) {
            options.push({
              value: `${padZero(h)}:${padZero(m)} ${ampm}`,
              hours: h,
              minutes: m,
              ampm,
            });
          }
        }
      });
    }

    return options;
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
