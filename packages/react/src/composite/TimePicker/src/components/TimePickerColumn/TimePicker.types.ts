import { RefObject } from "react";
import { DropdownOption } from "../../timePicker.types";

interface SingleColumnProps {
    type: "hours" | "minutes";
    options: number[];
    value?: number;
    selected?: number;
    onSelect: (value: number) => void;
    format: "12h" | "24h";
    label?: string;
}

interface CombinedColumnProps {
    scrollContainerRef?: RefObject<HTMLDivElement | null>;
    type: "combined";
    options: DropdownOption[];
    currentValue?: string | null;
    selectedValue?: string | null;
    onSelectTime: (hours: number, minutes: number, ampm?: "AM" | "PM") => void;
    label?: string;
    format: "12h" | "24h";
    step?: number;
}

export type { SingleColumnProps, CombinedColumnProps };
