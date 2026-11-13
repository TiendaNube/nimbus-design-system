import type { ComboboxLabels } from "../../combobox.types";
import type { ComboboxRowModel } from "../../hooks";

export interface ComboboxRowProps {
  row: ComboboxRowModel;
  /** Id of the row, referenced by `aria-activedescendant`. */
  id: string;
  /** Whether it is the keyboard-active row. */
  active: boolean;
  labels: ComboboxLabels;
  onActivate: (row: ComboboxRowModel) => void;
}
