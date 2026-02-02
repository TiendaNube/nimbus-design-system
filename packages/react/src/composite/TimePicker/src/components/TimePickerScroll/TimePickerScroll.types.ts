import type {
  AmPm,
  TimePickerPanelBaseProps,
  TimeValue,
} from "../../timePicker.types";

export interface TimePickerScrollPanelProps extends TimePickerPanelBaseProps {
  hourOptions: number[];
  minuteOptions: number[];
  initialValue: TimeValue | null;
  timeValue: Partial<TimeValue> | null;
  setHours: (hours: number) => void;
  setMinutes: (minutes: number) => void;
  setAmPm: (ampm: AmPm) => void;
}
