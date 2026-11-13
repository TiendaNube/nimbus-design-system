/**
 * Visual style of an option tag.
 */
export type ComboboxTagAppearance =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral";

/**
 * Short status text shown at the end of an option row, and after the selected
 * label inside the field in single mode.
 */
export interface ComboboxTag {
  /** The text of the tag. */
  label: string;
  /** Visual style of the tag. */
  appearance?: ComboboxTagAppearance;
}

/**
 * An option of the Combobox. An option with `children` is a branch of a hierarchy.
 */
export interface ComboboxOption {
  /** Unique identifier of the option across the whole option tree. */
  value: string;
  /** Plain text shown for the option; it is the only text that is searched. */
  label: string;
  /** One line of secondary text shown below the label. */
  subtitle?: string;
  /** Tag shown at the end of the label line. */
  tag?: ComboboxTag;
  /** Whether the option cannot be selected. */
  disabled?: boolean;
  /** Nested options. A hierarchy supports up to six levels. */
  children?: ComboboxOption[];
}

/**
 * Translatable texts of the Combobox. `{name}` and `{text}` are replaced.
 */
export interface ComboboxLabels {
  /** Back control below the first level. @default "Back" */
  back: string;
  /** Back control below deeper levels, `{name}` is the level it returns to. @default "Back to {name}" */
  backTo: string;
  /** Added to the accessible name of a branch option. @default "has subcategories" */
  branchHint: string;
  /** Clear button of a single value. @default "Clear selection" */
  clearSelection: string;
  /** Clear-all button of a multiple value. @default "Clear all" */
  clearAll: string;
  /** Remove button of a chip, `{name}` is the option label. @default "Remove {name}" */
  removeChip: string;
  /** Message shown when no option matches. @default "No results" */
  noResults: string;
  /** Accessible name of the scrolling list of options. @default "Options" */
  listbox: string;
  /** Name of the group of results, announced with their number. @default "Results" */
  results: string;
  /** Create row, `{text}` is the typed text. @default "Create \"{text}\"" */
  create: string;
  /** Validation message of a required field without a value. @default "Select a value" */
  required: string;
}

/**
 * Visual style of the field, as on `Input`.
 */
export type ComboboxAppearance = "neutral" | "success" | "warning" | "danger";

/**
 * Properties shared by the single and the multiple Combobox.
 */
export interface ComboboxProperties {
  /**
   * The options. An option with `children` is a branch of a hierarchy.
   */
  options: ComboboxOption[];
  /**
   * Allows several values.
   * @default false
   */
  multiple?: boolean;
  /**
   * Enables instant creation: it receives the trimmed typed text and returns the new option.
   * @TJS-type (label: string) => ComboboxOption
   */
  onCreate?: (label: string) => ComboboxOption;
  /**
   * Single mode: whether a selected value can be cleared.
   * @default true
   */
  clearable?: boolean;
  /**
   * Replaces the default match (label contains the query, ignoring case and diacritics).
   * @TJS-type (option: ComboboxOption, query: string) => boolean
   */
  filter?: (option: ComboboxOption, query: string) => boolean;
  /**
   * Hierarchy: whether a parent can be chosen from its own level.
   * @default true
   */
  selectableBranches?: boolean;
  /**
   * Shown while the input is empty and nothing is selected.
   */
  placeholder?: string;
  /**
   * Disables the whole field.
   * @default false
   */
  disabled?: boolean;
  /**
   * Visual style of the field.
   * @default neutral
   */
  appearance?: ComboboxAppearance;
  /**
   * Form field name. Renders hidden fields with the selected values.
   */
  name?: string;
  /**
   * Requires a value.
   * @default false
   */
  required?: boolean;
  /**
   * Id of the text input, for a `<label htmlFor>`.
   */
  id?: string;
  /**
   * Accessible name of the field.
   */
  "aria-label"?: string;
  /**
   * Id of the element that names the field.
   */
  "aria-labelledby"?: string;
  /**
   * Id of the element that describes the field, for example its help text.
   */
  "aria-describedby"?: string;
  /**
   * Translatable texts; any text left out uses its English default.
   * @TJS-type Partial<ComboboxLabels>
   */
  labels?: Partial<ComboboxLabels>;
  /**
   * Test identifier, set on the text input.
   */
  "data-testid"?: string;
}

/**
 * Properties of the single Combobox.
 */
export interface ComboboxSingleProperties {
  /** Single mode (default). */
  multiple?: false;
  /** Controlled value. */
  value?: ComboboxOption | null;
  /** Initial value when uncontrolled. */
  defaultValue?: ComboboxOption | null;
  /** Called when a value is chosen, created or cleared. */
  onChange?: (value: ComboboxOption | null) => void;
}

/**
 * Properties of the multiple Combobox.
 */
export interface ComboboxMultipleProperties {
  /** Multiple mode. */
  multiple: true;
  /** Controlled value. */
  value?: ComboboxOption[];
  /** Initial value when uncontrolled. */
  defaultValue?: ComboboxOption[];
  /** Called with the full current set when a value is chosen, created or removed, or all are cleared. */
  onChange?: (value: ComboboxOption[]) => void;
}

/**
 * Props of the Combobox: the shared properties and the ones of its mode.
 */
export type ComboboxProps = Omit<ComboboxProperties, "multiple"> &
  (ComboboxSingleProperties | ComboboxMultipleProperties);
