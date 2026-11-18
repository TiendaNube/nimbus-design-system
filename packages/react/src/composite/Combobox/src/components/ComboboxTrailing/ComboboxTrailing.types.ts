/**
 * Properties of the ComboboxTrailing sub-component.
 */
export interface ComboboxTrailingProperties {
  /** The clear button of a single value, the clear-all one, or the chevron. */
  control: "clear" | "clearAll" | "chevron";
  /** Accessible name of the clear or clear-all button. */
  label: string;
  onClear: () => void;
}

/**
 * Props of the ComboboxTrailing sub-component.
 */
export type ComboboxTrailingProps = ComboboxTrailingProperties;
