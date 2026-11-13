import type { ComboboxLabels, ComboboxOption } from "../../combobox.types";
import type { ComboboxEntry } from "../../utils";

export interface ComboboxChipsProps {
  /** The selected options, in the order they were chosen. */
  selection: ComboboxOption[];
  /** The whole option tree indexed by `value`. */
  index: Map<string, ComboboxEntry>;
  /** Prefix of the ids of the hidden path descriptions. */
  baseId: string;
  disabled: boolean;
  labels: ComboboxLabels;
  onRemove: (option: ComboboxOption) => void;
}
