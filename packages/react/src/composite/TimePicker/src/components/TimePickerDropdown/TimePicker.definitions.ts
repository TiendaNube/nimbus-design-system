import { AmPm } from "../../timePicker.types";

function convertTo24Hours(
  hours: number | undefined,
  fallbackHours: number,
  ampm: AmPm | undefined
): number {
  if (hours === undefined) {
    return fallbackHours;
  }
  if (ampm === "PM" && hours !== 12) {
    return hours + 12;
  }
  if (ampm === "AM" && hours === 12) {
    return 0;
  }
  return hours;
}

export { convertTo24Hours };
