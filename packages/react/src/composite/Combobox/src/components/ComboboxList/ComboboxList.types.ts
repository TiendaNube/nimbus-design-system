import type { RefObject } from "react";
import type { ComboboxLabels } from "../../combobox.types";
import type { UseComboboxResult } from "../../hooks";

export interface ComboboxListProps {
  /** State and actions of the Combobox. */
  model: UseComboboxResult;
  labels: ComboboxLabels;
  multiple: boolean;
  /** Id of the listbox, referenced by the text input. */
  listboxId: string;
  /** Ref of the list element, used to detect presses outside the Combobox. */
  listRef: RefObject<HTMLDivElement | null>;
}
