import type { RefObject } from "react";
import type { ComboboxLabels } from "../../combobox.types";
import type { UseComboboxResult } from "../../hooks";

/**
 * Properties of the ComboboxList sub-component.
 */
export interface ComboboxListProperties {
  /** State and actions of the Combobox. */
  model: UseComboboxResult;
  labels: ComboboxLabels;
  multiple: boolean;
  /** Id of the listbox, referenced by the text input. */
  listboxId: string;
  /** Ref of the list element, used to detect presses outside the Combobox. */
  listRef: RefObject<HTMLDivElement | null>;
}

/**
 * Props of the ComboboxList sub-component.
 */
export type ComboboxListProps = ComboboxListProperties;
