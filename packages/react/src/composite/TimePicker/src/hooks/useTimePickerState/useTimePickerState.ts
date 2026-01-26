import { useState, useCallback, useMemo } from "react";
import { TimeFormat, TimeValue, AmPm } from "../../timePicker.types";
import {
  parseTimeString,
  formatTimeValue,
  timeToMinutes,
  padZero,
} from "../../utils/timeUtils";

interface UseTimePickerStateProps {
  value?: string | Date | null;
  onChange?: (value: string | null, date: Date | null) => void;
  format: TimeFormat;
  step: number;
  minTime?: string;
  maxTime?: string;
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
  dropdownOptions: Array<{
    value: string;
    hours: number;
    minutes: number;
    ampm?: AmPm;
    disabled: boolean;
  }>;
  isTimeDisabled: (hours: number, minutes: number, ampm?: AmPm) => boolean;
  isHourDisabled: (hour: number) => boolean;
  isMinuteDisabled: (minute: number) => boolean;
}

function parseMinMaxTime(time: string | undefined): number | null {
  if (!time) return null;
  const parsed = parseTimeString(time, "24h");
  return parsed ? parsed.hours * 60 + parsed.minutes : null;
}

export function useTimePickerState({
  value,
  format,
  step,
  minTime,
  maxTime,
}: UseTimePickerStateProps): UseTimePickerStateReturn {
  const [internalValue, setInternalValue] = useState<Partial<TimeValue>>({
    ampm: "AM",
  });
  const initialValue = useMemo(
    () => parseTimeString(value, format),
    [value, format]
  );

  const minMinutes = useMemo(() => parseMinMaxTime(minTime), [minTime]);
  const maxMinutes = useMemo(() => parseMinMaxTime(maxTime), [maxTime]);

  const isTimeDisabled = useCallback(
    (hours: number, minutes: number, ampm?: AmPm): boolean => {
      const totalMinutes = timeToMinutes(
        hours,
        minutes,
        format === "12h" ? ampm : undefined
      );
      return (
        (minMinutes !== null && totalMinutes < minMinutes) ||
        (maxMinutes !== null && totalMinutes > maxMinutes)
      );
    },
    [format, minMinutes, maxMinutes]
  );

  const isHourDisabled = useCallback(
    (hour: number): boolean => {
      const ampm = format === "12h" ? internalValue?.ampm || "AM" : undefined;
      const totalMinutes = timeToMinutes(hour, 0, ampm);
      const hourEnd = totalMinutes + 59;

      return (
        (minMinutes !== null && hourEnd < minMinutes) ||
        (maxMinutes !== null && totalMinutes > maxMinutes)
      );
    },
    [format, internalValue?.ampm, minMinutes, maxMinutes]
  );

  const isMinuteDisabled = useCallback(
    (minute: number): boolean =>
      internalValue
        ? isTimeDisabled(internalValue.hours ?? 0, minute, internalValue.ampm)
        : false,
    [internalValue, isTimeDisabled]
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

  const dropdownOptions = useMemo(() => {
    const options: Array<{
      value: string;
      hours: number;
      minutes: number;
      ampm?: AmPm;
      disabled: boolean;
    }> = [];

    if (format === "24h") {
      for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += step) {
          options.push({
            value: `${padZero(h)}:${padZero(m)}`,
            hours: h,
            minutes: m,
            disabled: isTimeDisabled(h, m),
          });
        }
      }
    } else {
      (["AM", "PM"] as AmPm[]).forEach((ampm) => {
        [12, ...Array.from({ length: 11 }, (_, i) => i + 1)].forEach((h) => {
          for (let m = 0; m < 60; m += step) {
            options.push({
              value: `${padZero(h)}:${padZero(m)} ${ampm}`,
              hours: h,
              minutes: m,
              ampm,
              disabled: isTimeDisabled(h, m, ampm),
            });
          }
        });
      });
    }

    return options;
  }, [format, step, isTimeDisabled]);

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
    dropdownOptions,
    isTimeDisabled,
    isHourDisabled,
    isMinuteDisabled,
  };
}
