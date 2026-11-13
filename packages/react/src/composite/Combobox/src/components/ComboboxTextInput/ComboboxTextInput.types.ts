import type { Ref } from "react";
import type { ComboboxOption } from "../../combobox.types";
import type { UseComboboxResult } from "../../hooks";

export interface ComboboxTextInputProps {
  /** State and actions of the Combobox. */
  model: UseComboboxResult;
  inputRef: Ref<HTMLInputElement>;
  id: string;
  listboxId: string;
  multiple: boolean;
  placeholder?: string;
  disabled: boolean;
  required: boolean;
  /** Path painted over the input, when a hierarchical value is selected. */
  valuePath?: ComboboxOption[];
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "data-testid"?: string;
}
