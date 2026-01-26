import { TimeValue, TimeFormat, AmPm } from "../timePicker.types";

export function padZero(num: number): string {
  return num.toString().padStart(2, "0");
}

export function to24Hour(hours: number, ampm?: AmPm): number {
  if (!ampm) return hours;
  return ampm === "PM" ? (hours % 12) + 12 : hours % 12;
}

export function to12Hour(hours24: number): { hours: number; ampm: AmPm } {
  const ampm: AmPm = hours24 >= 12 ? "PM" : "AM";
  const hours = hours24 % 12 || 12;
  return { hours, ampm };
}

export function parseTimeString(
  value: string | Date | null | undefined,
  format: TimeFormat
): TimeValue | null {
  if (!value) return null;

  if (value instanceof Date) {
    const hours24 = value.getHours();
    const minutes = value.getMinutes();

    if (format === "12h") {
      const { hours, ampm } = to12Hour(hours24);
      return { hours, minutes, ampm };
    }

    return { hours: hours24, minutes };
  }

  const trimmed = value.trim().toUpperCase();
  const match12h = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(trimmed);
  const match24h = /^(\d{1,2}):(\d{2})$/.exec(trimmed);

  if (match12h) {
    const hours = parseInt(match12h[1], 10);
    const minutes = parseInt(match12h[2], 10);
    const ampm = match12h[3].toUpperCase() as AmPm;

    if (hours >= 1 && hours <= 12 && minutes >= 0 && minutes <= 59) {
      if (format === "12h") {
        return { hours, minutes, ampm };
      }
      return { hours: to24Hour(hours, ampm), minutes };
    }
  }

  if (match24h) {
    const hours = parseInt(match24h[1], 10);
    const minutes = parseInt(match24h[2], 10);

    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      if (format === "24h") {
        return { hours, minutes };
      }
      const { hours: hours12, ampm } = to12Hour(hours);
      return { hours: hours12, minutes, ampm };
    }
  }

  return null;
}

export function formatTimeValue(
  timeValue: TimeValue | null,
  format: TimeFormat
): string {
  if (!timeValue) return "";

  const formatted = `${padZero(timeValue.hours)}:${padZero(timeValue.minutes)}`;
  return format === "12h"
    ? `${formatted} ${timeValue.ampm || "AM"}`
    : formatted;
}

export function timeValueToDate(
  timeValue: TimeValue | null,
  format: TimeFormat
): Date | null {
  if (!timeValue) return null;

  const date = new Date();
  const hours24 =
    format === "12h"
      ? to24Hour(timeValue.hours, timeValue.ampm)
      : timeValue.hours;
  date.setHours(hours24, timeValue.minutes, 0, 0);
  return date;
}
