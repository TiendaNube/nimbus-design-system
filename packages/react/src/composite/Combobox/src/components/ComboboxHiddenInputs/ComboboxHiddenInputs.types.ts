import type { ComboboxOption } from "../../combobox.types";

export interface ComboboxHiddenInputsProps {
  /** Form field name; nothing is rendered without it. */
  name?: string;
  selection: ComboboxOption[];
  multiple: boolean;
}
