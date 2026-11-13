export interface ComboboxTrailingProps {
  /** The clear button of a single value, the clear-all one, or the chevron. */
  control: "clear" | "clearAll" | "chevron";
  /** Accessible name of the clear or clear-all button. */
  label: string;
  onClear: () => void;
}
