import { AmPm } from "../../timePicker.types";

export interface TimePickerAmPmProps {
    /**
     * Currently selected AM/PM value.
     */
    value: AmPm;
    /**
     * Callback when new value of AM/PM is selected.
     */
    onSelect: (value: AmPm) => void;
    /**
     * Whether the AM/PM selector is disabled.
     */
    disabled?: boolean;
    /**
     * Display text for the AM option.
     * @default "AM"
     */
    amLabel?: string;
    /**
     * Display text for the PM option.
     * @default "PM"
     */
    pmLabel?: string;
    /**
     * Accessible label for the AM/PM selector group.
     * @default "AM/PM selector"
     */
    selectorLabel?: string;
}
