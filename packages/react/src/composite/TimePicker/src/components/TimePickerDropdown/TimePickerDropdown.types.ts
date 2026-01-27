import type {
  TimePickerPanelBaseProps,
  DropdownOption,
  TimeValue,
  AmPm,
} from "../../timePicker.types";

export interface TimePickerDropdownProps extends TimePickerPanelBaseProps {
  step: number;
  dropdownOptions: DropdownOption[];
  initialValue: TimeValue | null;
  internalTimeValue: Partial<TimeValue> | null;
  selectTime: (hours: number, minutes: number, ampm?: AmPm) => void;
  setAmPm: (ampm: AmPm) => void;
}
