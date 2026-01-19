import { useState, useCallback, useMemo, useEffect } from "react";
import { TimeFormat, TimeValue, AmPm } from "../../timePicker.types";

interface UseTimePickerStateProps {
  value?: string | Date | null;
  onChange?: (value: string | null, date: Date | null) => void;
  format: TimeFormat;
  step: number;
  minTime?: string;
  maxTime?: string;
}

interface UseTimePickerStateReturn {
  timeValue: TimeValue | null;
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

function padZero(num: number): string {
  return num.toString().padStart(2, "0");
}

function parseTimeString(
  value: string | Date | null | undefined,
  format: TimeFormat
): TimeValue | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (value instanceof Date) {
    const hours24 = value.getHours();
    const minutes = value.getMinutes();

    if (format === "12h") {
      const ampm: AmPm = hours24 >= 12 ? "PM" : "AM";
      const hours12 = hours24 % 12 || 12;
      return { hours: hours12, minutes, ampm };
    }
    return { hours: hours24, minutes };
  }

  if (typeof value === "string") {
    const trimmed = value.trim().toUpperCase();

    const match12h = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(trimmed);
    if (match12h) {
      const hours = parseInt(match12h[1], 10);
      const minutes = parseInt(match12h[2], 10);
      const ampm = match12h[3].toUpperCase() as AmPm;

      if (hours >= 1 && hours <= 12 && minutes >= 0 && minutes <= 59) {
        if (format === "12h") {
          return { hours, minutes, ampm };
        }
        const hours24 = ampm === "PM" ? (hours % 12) + 12 : hours % 12;
        return { hours: hours24, minutes };
      }
    }

    const match24h = /^(\d{1,2}):(\d{2})$/.exec(trimmed);
    if (match24h) {
      const hours = parseInt(match24h[1], 10);
      const minutes = parseInt(match24h[2], 10);

      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        if (format === "24h") {
          return { hours, minutes };
        }
        const ampm: AmPm = hours >= 12 ? "PM" : "AM";
        const hours12 = hours % 12 || 12;
        return { hours: hours12, minutes, ampm };
      }
    }
  }

  return null;
}

function formatTimeValue(
  timeValue: TimeValue | null,
  format: TimeFormat
): string {
  if (!timeValue) return "";

  if (format === "12h") {
    return `${padZero(timeValue.hours)}:${padZero(timeValue.minutes)} ${
      timeValue.ampm || "AM"
    }`;
  }
  return `${padZero(timeValue.hours)}:${padZero(timeValue.minutes)}`;
}

function timeValueToDate(
  timeValue: TimeValue | null,
  format: TimeFormat
): Date | null {
  if (!timeValue) return null;

  const date = new Date();
  let hours24: number;

  if (format === "12h" && timeValue.ampm) {
    hours24 =
      timeValue.ampm === "PM"
        ? (timeValue.hours % 12) + 12
        : timeValue.hours % 12;
  } else {
    hours24 = timeValue.hours;
  }

  date.setHours(hours24, timeValue.minutes, 0, 0);
  return date;
}

function parseMinMaxTime(time: string | undefined): number | null {
  if (!time) return null;

  const parsed = parseTimeString(time, "24h");
  if (!parsed) return null;

  return parsed.hours * 60 + parsed.minutes;
}

function timeToMinutes(hours: number, minutes: number, ampm?: AmPm): number {
  let hours24 = hours;
  if (ampm) {
    hours24 = ampm === "PM" ? (hours % 12) + 12 : hours % 12;
  }
  return hours24 * 60 + minutes;
}

export function useTimePickerState({
  value,
  onChange,
  format,
  step,
  minTime,
  maxTime,
}: UseTimePickerStateProps): UseTimePickerStateReturn {
  const [internalValue, setInternalValue] = useState<TimeValue | null>(() =>
    parseTimeString(value, format)
  );

  useEffect(() => {
    const parsed = parseTimeString(value, format);
    setInternalValue(parsed);
  }, [value, format]);

  const minMinutes = useMemo(() => parseMinMaxTime(minTime), [minTime]);
  const maxMinutes = useMemo(() => parseMinMaxTime(maxTime), [maxTime]);

  const isTimeDisabled = useCallback(
    (hours: number, minutes: number, ampm?: AmPm): boolean => {
      const totalMinutes = timeToMinutes(
        hours,
        minutes,
        format === "12h" ? ampm : undefined
      );

      if (minMinutes !== null && totalMinutes < minMinutes) return true;
      if (maxMinutes !== null && totalMinutes > maxMinutes) return true;

      return false;
    },
    [format, minMinutes, maxMinutes]
  );

  const isHourDisabled = useCallback(
    (hour: number): boolean => {
      if (format === "24h") {
        const hourStart = hour * 60;
        const hourEnd = hour * 60 + 59;

        if (minMinutes !== null && hourEnd < minMinutes) return true;
        if (maxMinutes !== null && hourStart > maxMinutes) return true;
      } else {
        const ampmValue = internalValue?.ampm || "AM";
        const hour24 = ampmValue === "PM" ? (hour % 12) + 12 : hour % 12;
        const hourStart = hour24 * 60;
        const hourEnd = hour24 * 60 + 59;

        if (minMinutes !== null && hourEnd < minMinutes) return true;
        if (maxMinutes !== null && hourStart > maxMinutes) return true;
      }

      return false;
    },
    [format, internalValue?.ampm, minMinutes, maxMinutes]
  );

  const isMinuteDisabled = useCallback(
    (minute: number): boolean => {
      if (!internalValue) return false;

      return isTimeDisabled(internalValue.hours, minute, internalValue.ampm);
    },
    [internalValue, isTimeDisabled]
  );

  const notifyChange = useCallback(
    (newValue: TimeValue | null) => {
      if (onChange) {
        const formattedValue = formatTimeValue(newValue, format);
        const dateValue = timeValueToDate(newValue, format);
        onChange(formattedValue || null, dateValue);
      }
    },
    [onChange, format]
  );

  const setHours = useCallback(
    (hours: number) => {
      const newValue: TimeValue = {
        hours,
        minutes: internalValue?.minutes ?? 0,
        ampm: format === "12h" ? internalValue?.ampm ?? "AM" : undefined,
      };
      setInternalValue(newValue);
      notifyChange(newValue);
    },
    [internalValue, format, notifyChange]
  );

  const setMinutes = useCallback(
    (minutes: number) => {
      const newValue: TimeValue = {
        hours: internalValue?.hours ?? (format === "12h" ? 12 : 0),
        minutes,
        ampm: format === "12h" ? internalValue?.ampm ?? "AM" : undefined,
      };
      setInternalValue(newValue);
      notifyChange(newValue);
    },
    [internalValue, format, notifyChange]
  );

  const setAmPm = useCallback(
    (ampm: AmPm) => {
      if (format !== "12h") return;

      const newValue: TimeValue = {
        hours: internalValue?.hours ?? 12,
        minutes: internalValue?.minutes ?? 0,
        ampm,
      };
      setInternalValue(newValue);
      notifyChange(newValue);
    },
    [internalValue, format, notifyChange]
  );

  const selectTime = useCallback(
    (hours: number, minutes: number, ampm?: AmPm) => {
      const newValue: TimeValue = {
        hours,
        minutes,
        ampm: format === "12h" ? ampm : undefined,
      };
      setInternalValue(newValue);
      notifyChange(newValue);
    },
    [format, notifyChange]
  );

  const clear = useCallback(() => {
    setInternalValue(null);
    notifyChange(null);
  }, [notifyChange]);

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
          const value = `${padZero(h)}:${padZero(m)}`;
          options.push({
            value,
            hours: h,
            minutes: m,
            disabled: isTimeDisabled(h, m),
          });
        }
      }
    } else {
      const ampmValues: AmPm[] = ["AM", "PM"];
      ampmValues.forEach((ampm) => {
        for (let h = 12; h <= 11 + 12; h++) {
          const displayHour = h > 12 ? h - 12 : h;

          for (let m = 0; m < 60; m += step) {
            const value = `${padZero(displayHour)}:${padZero(m)} ${ampm}`;
            options.push({
              value,
              hours: displayHour,
              minutes: m,
              ampm,
              disabled: isTimeDisabled(displayHour, m, ampm),
            });
          }
        }
      });
    }

    return options;
  }, [format, step, isTimeDisabled]);

  const displayValue = useMemo(
    () => formatTimeValue(internalValue, format),
    [internalValue, format]
  );

  return {
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
