import type { KeyboardEvent, RefObject } from "react";
import type { ComboboxLabels, ComboboxOption } from "../../combobox.types";
import type { ComboboxEntry } from "../../utils";

/**
 * A row of the list.
 */
export type ComboboxRowModel =
  | {
      kind: "create";
      key: string;
      /** Trimmed typed text the option is created from. */
      text: string;
    }
  | {
      kind: "title";
      key: string;
      /** The branch whose level is open. */
      option: ComboboxOption;
      /** Whether the title selects the branch. */
      selectable: boolean;
      selected: boolean;
    }
  | {
      kind: "option";
      key: string;
      option: ComboboxOption;
      /** Ancestors of the option, from the root list down to its parent. */
      ancestors: ComboboxOption[];
      /** Whether activating the row opens a level. */
      branch: boolean;
      selected: boolean;
      /** Whether the ancestors are shown below the label (search results). */
      showPath: boolean;
    };

/**
 * Parameters of `useCombobox`, with the mode already resolved.
 */
export interface UseComboboxParams {
  options: ComboboxOption[];
  multiple: boolean;
  /** Controlled selection, or `undefined` when the component manages it. */
  value: ComboboxOption[] | undefined;
  defaultValue: ComboboxOption[];
  onSelectionChange: (selection: ComboboxOption[]) => void;
  onCreate?: (label: string) => ComboboxOption;
  clearable: boolean;
  filter?: (option: ComboboxOption, query: string) => boolean;
  selectableBranches: boolean;
  disabled: boolean;
  labels: ComboboxLabels;
  /** Prefix of the ids of the list and its rows. */
  baseId: string;
}

/**
 * What `useCombobox` returns to the component.
 */
export interface UseComboboxResult {
  fieldRef: RefObject<HTMLDivElement | null>;
  listRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  open: boolean;
  selection: ComboboxOption[];
  /** Text shown in the input. */
  inputText: string;
  hierarchical: boolean;
  /** The whole option tree indexed by `value`. */
  index: Map<string, ComboboxEntry>;
  rows: ComboboxRowModel[];
  /** Number of option rows, for the results announcement. */
  resultCount: number;
  activeRowId: string | undefined;
  /** Id of the row at `rows[index]`. */
  getRowId: (index: number) => string;
  isActive: (row: ComboboxRowModel) => boolean;
  /** Text of the back control, or `null` at the root or while searching. */
  backLabel: string | null;
  /** Name of the group that holds the rows. */
  groupLabel: string;
  isSearching: boolean;
  activateRow: (row: ComboboxRowModel) => void;
  goBack: () => void;
  clearSelection: () => void;
  removeValue: (option: ComboboxOption) => void;
  openList: () => void;
  focusInput: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
  handleChange: (value: string) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}
