import type { AmPm } from "../../timePicker.types";

export const HOURS_IN_HALF_DAY = 12;
export const MIDNIGHT_HOUR = 0;

function convertTo24Hours(
  hours: number | undefined,
  fallbackHours: number,
  ampm: AmPm | undefined
): number {
  if (hours === undefined) {
    return fallbackHours;
  }
  if (ampm === "PM" && hours !== HOURS_IN_HALF_DAY) {
    return hours + HOURS_IN_HALF_DAY;
  }
  if (ampm === "AM" && hours === HOURS_IN_HALF_DAY) {
    return MIDNIGHT_HOUR;
  }
  return hours;
}

export { convertTo24Hours };
