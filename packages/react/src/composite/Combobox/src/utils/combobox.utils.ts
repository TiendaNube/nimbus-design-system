import type { ComboboxLabels, ComboboxOption } from "../combobox.types";

/** Maximum number of levels of a hierarchy, the root list being level 1. */
export const MAX_LEVELS = 6;

/** Separator of a path exposed as text to assistive technology. */
export const PATH_TEXT_SEPARATOR = " > ";

/** Separator of a path rendered as the text of a chip. */
export const CHIP_PATH_SEPARATOR = " › ";

/** English defaults of every text provided by the component. */
export const DEFAULT_LABELS: ComboboxLabels = {
  back: "Back",
  backTo: "Back to {name}",
  branchHint: "has subcategories",
  clearSelection: "Clear selection",
  clearAll: "Clear all",
  removeChip: "Remove {name}",
  noResults: "No results",
  listbox: "Options",
  results: "Results",
  create: 'Create "{text}"',
  required: "Select a value"
};

/** An option with the options that lead to it, from the root list. */
export interface ComboboxEntry {
  option: ComboboxOption;
  /** Ancestors of the option, from the root list down to its parent. */
  ancestors: ComboboxOption[];
}

/**
 * Replaces the `{name}` and `{text}` placeholders of a label.
 */
export const fillLabel = (
  template: string,
  values: Record<string, string>
): string =>
  Object.keys(values).reduce(
    (text, key) => text.split(`{${key}}`).join(values[key]),
    template
  );

/**
 * Lowercases a text and removes its diacritics, so "camara" matches "Cámara".
 */
export const normalizeText = (text: string): string =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * Default match: the label contains the query, ignoring case and diacritics.
 */
export const defaultFilter = (option: ComboboxOption, query: string): boolean =>
  normalizeText(option.label).includes(normalizeText(query));

/**
 * Whether the option is a branch of a hierarchy.
 */
export const isBranch = (option: ComboboxOption): boolean =>
  Array.isArray(option.children) && option.children.length > 0;

/**
 * Whether any option of the tree has children.
 */
export const hasHierarchy = (options: ComboboxOption[]): boolean =>
  options.some((option) => isBranch(option));

/**
 * Children of an option placed at `depth` (the root list is depth 1).
 * An option at the last level has no visible children.
 */
export const getVisibleChildren = (
  option: ComboboxOption,
  depth: number
): ComboboxOption[] =>
  depth < MAX_LEVELS && option.children ? option.children : [];

/**
 * Flattens the tree up to the level limit, keeping the ancestors of each option.
 */
export const flattenTree = (
  options: ComboboxOption[],
  ancestors: ComboboxOption[] = []
): ComboboxEntry[] =>
  options.flatMap((option) => [
    { option, ancestors },
    ...flattenTree(getVisibleChildren(option, ancestors.length + 1), [
      ...ancestors,
      option
    ])
  ]);

/**
 * Index of the whole option tree by `value`, and the values found more than once.
 */
export const buildIndex = (
  options: ComboboxOption[]
): { index: Map<string, ComboboxEntry>; duplicates: string[] } => {
  const index = new Map<string, ComboboxEntry>();
  const duplicates: string[] = [];
  flattenTree(options).forEach((entry) => {
    if (index.has(entry.option.value)) {
      duplicates.push(entry.option.value);
    } else {
      index.set(entry.option.value, entry);
    }
  });
  return { index, duplicates };
};

/**
 * Options of the level reached through `levelPath` (values of the branches
 * entered from the root list).
 */
export const getLevelOptions = (
  options: ComboboxOption[],
  levelPath: string[],
  index: Map<string, ComboboxEntry>
): ComboboxOption[] => {
  const last = levelPath[levelPath.length - 1];
  if (last === undefined) return options;
  const entry = index.get(last);
  return entry
    ? getVisibleChildren(entry.option, entry.ancestors.length + 1)
    : [];
};

/**
 * Options of the whole tree that match the query, each with its ancestors.
 */
export const searchTree = (
  options: ComboboxOption[],
  query: string,
  filter: (option: ComboboxOption, query: string) => boolean
): ComboboxEntry[] =>
  flattenTree(options).filter((entry) => filter(entry.option, query));

/**
 * Whether some option of the tree has the same label as the text, ignoring
 * case and diacritics.
 */
export const hasEqualLabel = (
  options: ComboboxOption[],
  text: string
): boolean => {
  const target = normalizeText(text);
  return flattenTree(options).some(
    (entry) => normalizeText(entry.option.label) === target
  );
};

/**
 * Path of an option from the root list, ending with the option itself.
 * An option that is not in the tree (for example a created one) is its own path.
 */
export const getPath = (
  option: ComboboxOption,
  index: Map<string, ComboboxEntry>
): ComboboxOption[] => {
  const entry = index.get(option.value);
  return entry ? [...entry.ancestors, entry.option] : [option];
};

/**
 * Joins the labels of a path.
 */
export const joinPath = (path: ComboboxOption[], separator: string): string =>
  path.map((option) => option.label).join(separator);

/**
 * Normalizes the value of the field into a list.
 */
export const toSelection = (
  value: ComboboxOption | ComboboxOption[] | null | undefined
): ComboboxOption[] => {
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
};

/**
 * Accessible name of an option row: label, subtitle and tag, then the path of
 * a result and the hint of a branch.
 */
export const buildRowName = (
  option: ComboboxOption,
  extras: { path?: string; branchHint?: string }
): string =>
  [
    option.label,
    option.subtitle,
    option.tag?.label,
    extras.path,
    extras.branchHint
  ]
    .filter(Boolean)
    .join(", ");

/**
 * Joins the class names that are defined.
 */
export const joinClassNames = (
  ...names: Array<string | null | undefined | false>
): string => names.filter(Boolean).join(" ");

/**
 * Text of each chip: its label, or its full path when another selected option
 * has the same label.
 */
export const getChipTexts = (
  selection: ComboboxOption[],
  index: Map<string, ComboboxEntry>
): string[] => {
  const counts = new Map<string, number>();
  selection.forEach((option) =>
    counts.set(option.label, (counts.get(option.label) ?? 0) + 1)
  );
  return selection.map((option) =>
    (counts.get(option.label) ?? 0) > 1
      ? joinPath(getPath(option, index), CHIP_PATH_SEPARATOR)
      : option.label
  );
};

/**
 * Values of the branches to enter, from the root list, to reach the level that
 * holds the option.
 */
export const getLevelPathOf = (
  option: ComboboxOption | undefined,
  index: Map<string, ComboboxEntry>
): string[] => {
  const entry = option ? index.get(option.value) : undefined;
  return entry ? entry.ancestors.map((ancestor) => ancestor.value) : [];
};

/**
 * Selection after an option is chosen in multiple mode: it is added, or
 * removed when it was already selected and `canToggle` is true.
 */
export const getNextMultipleSelection = (
  selection: ComboboxOption[],
  option: ComboboxOption,
  canToggle: boolean
): ComboboxOption[] => {
  const isSelected = selection.some((item) => item.value === option.value);
  if (!isSelected) return [...selection, option];
  return canToggle
    ? selection.filter((item) => item.value !== option.value)
    : selection;
};

/**
 * Position of the active row after a move, without wrapping.
 */
export const getNextActiveIndex = (
  target: "next" | "previous" | "first" | "last",
  activeIndex: number,
  count: number
): number => {
  const last = count - 1;
  const positions = {
    next: Math.min(activeIndex + 1, last),
    previous: activeIndex < 0 ? last : Math.max(activeIndex - 1, 0),
    first: 0,
    last
  };
  return positions[target];
};

/**
 * The control at the end of the field for the current value.
 */
export const getTrailingControl = (params: {
  multiple: boolean;
  selectionCount: number;
  clearable: boolean;
  disabled: boolean;
}): "clear" | "clearAll" | "chevron" => {
  const { multiple, selectionCount, clearable, disabled } = params;
  if (disabled) return "chevron";
  if (multiple) return selectionCount >= 2 ? "clearAll" : "chevron";
  return selectionCount > 0 && clearable ? "clear" : "chevron";
};
