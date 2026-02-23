import type { AmPm, TimeFormat, TimeValue } from "../../timePicker.types";

export interface UseTimePickerStateProps {
  value?: string | Date | null;
  onChange?: (value: string | null, date: Date | null) => void;
  format: TimeFormat;
  step: number;
}

export interface UseTimePickerStateReturn {
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
