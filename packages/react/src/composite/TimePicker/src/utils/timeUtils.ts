import type { TimeValue, TimeFormat, AmPm } from "../timePicker.types";

function to24Hour(hours: number, ampm?: AmPm): number {
  if (!ampm) return hours;
  return ampm === "PM" ? (hours % 12) + 12 : hours % 12;
}

function to12Hour(hours24: number): { hours: number; ampm: AmPm } {
  const ampm: AmPm = hours24 >= 12 ? "PM" : "AM";
  const hours = hours24 % 12 || 12;
  return { hours, ampm };
}

/**
 * Pads a number with zeros to make it two digits.
 * @param num - The number to pad.
 * @returns The padded number.
 * @example
 * padZero(1) // "01"
 * padZero(10) // "10"
 */
function padZero(num: number): string {
  return num.toString().padStart(2, "0");
}

/**
 * Parses a time string or Date object to a TimeValue object.
 * @param value - The time string or Date object to parse.
 * @param format - The format to use.
 * @returns The parsed TimeValue object.
 * @example
 * parseTimeString("10:30", "12h") // { hours: 10, minutes: 30, ampm: "AM" }
 * parseTimeString("10:30", "24h") // { hours: 10, minutes: 30 }
 * parseTimeString("10:30", "12h") // { hours: 10, minutes: 30, ampm: "AM" }
 */
function parseTimeString(
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

/**
 * Formats a TimeValue object to a string representation of the time.
 * @param timeValue - The TimeValue object to format.
 * @param format - The format to use.
 * @returns The formatted time string.
 * @example
 * formatTimeValue({ hours: 10, minutes: 30 }, "12h") // "10:30 AM"
 * formatTimeValue({ hours: 10, minutes: 30 }, "24h") // "10:30"
 */
function formatTimeValue(
  timeValue: TimeValue | null,
  format: TimeFormat
): string {
  if (!timeValue) return "";

  const formatted = `${padZero(timeValue.hours)}:${padZero(timeValue.minutes)}`;
  return format === "12h"
    ? `${formatted} ${timeValue.ampm || "AM"}`
    : formatted;
}

export { padZero, parseTimeString, formatTimeValue, to24Hour, to12Hour };
