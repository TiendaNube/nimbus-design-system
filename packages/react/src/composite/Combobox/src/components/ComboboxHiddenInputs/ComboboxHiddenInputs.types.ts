import type { ComboboxOption } from "../../combobox.types";

/**
 * Properties of the ComboboxHiddenInputs sub-component.
 */
export interface ComboboxHiddenInputsProperties {
  /** Form field name; nothing is rendered without it. */
  name?: string;
  selection: ComboboxOption[];
  multiple: boolean;
  /** A disabled field submits no value, as a native disabled control. */
  disabled: boolean;
}

/**
 * Props of the ComboboxHiddenInputs sub-component.
 */
export type ComboboxHiddenInputsProps = ComboboxHiddenInputsProperties;
