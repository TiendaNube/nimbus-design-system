import type { ComboboxOption } from "../../combobox.types";

/**
 * Properties of the ComboboxValuePath sub-component.
 */
export interface ComboboxValuePathProperties {
  /** Options from the root list down to the selected option. */
  path: ComboboxOption[];
}

/**
 * Props of the ComboboxValuePath sub-component.
 */
export type ComboboxValuePathProps = ComboboxValuePathProperties;
