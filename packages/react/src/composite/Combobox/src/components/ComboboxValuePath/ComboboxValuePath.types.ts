import type { ComboboxOption } from "../../combobox.types";

export interface ComboboxValuePathProps {
  /** Options from the root list down to the selected option. */
  path: ComboboxOption[];
}
