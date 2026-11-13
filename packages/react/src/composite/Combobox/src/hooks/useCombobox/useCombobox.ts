import { useEffect, useMemo, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent } from "react";

import type { ComboboxOption } from "../../combobox.types";
import {
  MAX_LEVELS,
  buildIndex,
  defaultFilter,
  fillLabel,
  getLevelOptions,
  getLevelPathOf,
  getNextActiveIndex,
  getNextMultipleSelection,
  hasEqualLabel,
  hasHierarchy,
  isBranch,
  searchTree
} from "../../utils";
import { resolveKey } from "./useCombobox.keyboard";
import type { ComboboxKeyAction } from "./useCombobox.keyboard";
import type {
  ComboboxRowModel,
  UseComboboxParams,
  UseComboboxResult
} from "./useCombobox.types";

/**
 * Builds the rows of the list for the current query and level.
 */
const buildRows = (params: {
  options: ComboboxOption[];
  hierarchical: boolean;
  multiple: boolean;
  query: string;
  levelPath: string[];
  index: ReturnType<typeof buildIndex>["index"];
  selectedValues: Set<string>;
  filter: (option: ComboboxOption, query: string) => boolean;
  selectableBranches: boolean;
  canCreate: boolean;
}): ComboboxRowModel[] => {
  const { hierarchical, query, levelPath, index, selectedValues } = params;
  const rows: ComboboxRowModel[] = [];
  const trimmed = query.trim();

  const offersCreate =
    params.canCreate &&
    trimmed !== "" &&
    !hierarchical &&
    !hasEqualLabel(params.options, trimmed);
  if (offersCreate) {
    rows.push({ kind: "create", key: "create", text: trimmed });
  }

  const toOptionRow = (
    option: ComboboxOption,
    ancestors: ComboboxOption[],
    showPath: boolean
  ): ComboboxRowModel => ({
    kind: "option",
    key: `option:${option.value}`,
    option,
    ancestors,
    branch: isBranch(option) && ancestors.length + 1 < MAX_LEVELS,
    selected: selectedValues.has(option.value),
    showPath
  });

  if (!hierarchical) {
    params.options
      .filter((option) => params.filter(option, query))
      .filter(
        (option) => !(params.multiple && selectedValues.has(option.value))
      )
      .forEach((option) => rows.push(toOptionRow(option, [], false)));
    return rows;
  }

  if (query !== "") {
    searchTree(params.options, query, params.filter).forEach((entry) =>
      rows.push(toOptionRow(entry.option, entry.ancestors, true))
    );
    return rows;
  }

  const parentEntry = index.get(levelPath[levelPath.length - 1] ?? "");
  if (parentEntry) {
    rows.push({
      kind: "title",
      key: "title",
      option: parentEntry.option,
      selectable: params.selectableBranches,
      selected: selectedValues.has(parentEntry.option.value)
    });
  }
  const levelAncestors = parentEntry
    ? [...parentEntry.ancestors, parentEntry.option]
    : [];
  getLevelOptions(params.options, levelPath, index).forEach((option) =>
    rows.push(toOptionRow(option, levelAncestors, false))
  );
  return rows;
};

/**
 * Back control text, name of the group of rows and whether the list shows
 * search results, for the current level.
 */
const getLevelPresentation = (params: {
  hierarchical: boolean;
  searching: boolean;
  levelPath: string[];
  index: ReturnType<typeof buildIndex>["index"];
  labels: UseComboboxParams["labels"];
}): { isSearching: boolean; backLabel: string | null; groupLabel: string } => {
  const { hierarchical, levelPath, index, labels } = params;
  const isSearching = hierarchical && params.searching;
  const levelName = (position: number): string =>
    index.get(levelPath[position] ?? "")?.option.label ?? "";
  const browsing = hierarchical && !isSearching;
  let backLabel: string | null = null;
  if (browsing && levelPath.length === 1) {
    backLabel = labels.back;
  } else if (browsing && levelPath.length > 1) {
    backLabel = fillLabel(labels.backTo, {
      name: levelName(levelPath.length - 2)
    });
  }
  const groupLabel =
    browsing && levelPath.length > 0
      ? levelName(levelPath.length - 1)
      : labels.results;
  return { isSearching, backLabel, groupLabel };
};

/**
 * Whether a row can be the active one.
 */
const isNavigable = (row: ComboboxRowModel): boolean => {
  if (row.kind === "create") return true;
  if (row.kind === "title") return row.selectable;
  return !row.option.disabled;
};

const warnDuplicates = (duplicates: string[]): void => {
  const isProduction =
    typeof process !== "undefined" && process.env.NODE_ENV === "production";
  if (duplicates.length > 0 && !isProduction) {
    // eslint-disable-next-line no-console
    console.warn(
      `[Combobox] Option values must be unique across the whole option tree. Duplicated: ${duplicates.join(
        ", "
      )}.`
    );
  }
};

/**
 * State and behavior of the Combobox: selection, open state, typed text,
 * hierarchy level, active row and keyboard handling.
 */
export const useCombobox = (params: UseComboboxParams): UseComboboxResult => {
  const {
    options,
    multiple,
    value,
    defaultValue,
    onSelectionChange,
    onCreate,
    clearable,
    filter,
    selectableBranches,
    disabled,
    labels,
    baseId
  } = params;

  const fieldRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const skipOpenOnFocus = useRef(false);
  const tabPressedInInput = useRef(false);

  const [innerSelection, setInnerSelection] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const [levelPath, setLevelPath] = useState<string[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const selection = value ?? innerSelection;
  const single = !multiple;
  const keepsValueWhileSearching = single && !clearable;

  const { index, duplicates } = useMemo(() => buildIndex(options), [options]);
  const duplicatesKey = duplicates.join("\u0000");
  useEffect(() => {
    warnDuplicates(duplicates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duplicatesKey]);

  const hierarchical = useMemo(() => hasHierarchy(options), [options]);
  const searchText = query ?? "";
  const inputText = query ?? (single && selection[0] ? selection[0].label : "");

  const rows = useMemo(
    () =>
      buildRows({
        options,
        hierarchical,
        multiple,
        query: searchText,
        levelPath,
        index,
        selectedValues: new Set(selection.map((option) => option.value)),
        filter: filter ?? defaultFilter,
        selectableBranches,
        canCreate: Boolean(onCreate)
      }),
    [
      options,
      hierarchical,
      multiple,
      searchText,
      levelPath,
      index,
      selection,
      filter,
      selectableBranches,
      onCreate
    ]
  );
  // Creation is not offered when any option has children.
  const navigable = useMemo(() => rows.filter(isNavigable), [rows]);
  const activeIndex = navigable.findIndex((row) => row.key === activeKey);
  const activeRow = activeIndex >= 0 ? navigable[activeIndex] : undefined;

  const getRowId = (rowIndex: number): string => `${baseId}-row-${rowIndex}`;
  const activeRowId = activeRow
    ? getRowId(rows.findIndex((row) => row.key === activeRow.key))
    : undefined;

  /* ----------------------------------------------------------------------------------------------
   * Open and close
   * --------------------------------------------------------------------------------------------*/

  const initialLevel = (): string[] =>
    getLevelPathOf(single ? selection[0] : undefined, index);

  const openList = (): void => {
    if (disabled || open) return;
    setLevelPath(initialLevel());
    setOpen(true);
  };

  const closeList = (): void => {
    setOpen(false);
    setActiveKey(null);
    if (keepsValueWhileSearching) setQuery(null);
  };

  const focusInput = (): void => {
    skipOpenOnFocus.current = true;
    try {
      inputRef.current?.focus();
    } finally {
      skipOpenOnFocus.current = false;
    }
  };

  const closeRef = useRef(closeList);
  closeRef.current = closeList;

  useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event: PointerEvent): void => {
      const target = event.target as Node | null;
      const inside =
        target &&
        (fieldRef.current?.contains(target) ||
          listRef.current?.contains(target));
      if (!inside) closeRef.current();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (!activeRowId) return;
    const element = document.getElementById(activeRowId);
    if (element && typeof element.scrollIntoView === "function") {
      element.scrollIntoView({ block: "nearest" });
    }
  }, [activeRowId]);

  /* ----------------------------------------------------------------------------------------------
   * Selection
   * --------------------------------------------------------------------------------------------*/

  const commit = (next: ComboboxOption[]): void => {
    if (value === undefined) setInnerSelection(next);
    onSelectionChange(next);
  };

  const choose = (option: ComboboxOption, canToggle = true): void => {
    if (single) {
      if (selection[0]?.value !== option.value) commit([option]);
      setQuery(null);
      closeList();
      return;
    }
    const next = getNextMultipleSelection(selection, option, canToggle);
    if (next !== selection) commit(next);
    setQuery(null);
    setActiveKey(null);
  };

  const create = (text: string): void => {
    if (!onCreate) return;
    const created = onCreate(text);
    choose(index.get(created.value)?.option ?? created, false);
  };

  const enterLevel = (values: string[]): void => {
    setLevelPath(values);
    setQuery(null);
    setActiveKey(null);
  };

  const goBack = (): void => {
    setLevelPath((current) => current.slice(0, -1));
    setActiveKey(null);
  };

  const activateRow = (row: ComboboxRowModel): void => {
    if (row.kind === "create") {
      create(row.text);
    } else if (row.kind === "title") {
      if (row.selectable) choose(row.option);
    } else if (!row.option.disabled && row.branch) {
      enterLevel([...row.ancestors, row.option].map((item) => item.value));
    } else if (!row.option.disabled) {
      choose(row.option);
    }
  };

  const clearSelection = (): void => {
    commit([]);
    setQuery(null);
    setLevelPath([]);
    closeList();
    focusInput();
  };

  const removeValue = (option: ComboboxOption): void => {
    commit(selection.filter((item) => item.value !== option.value));
    focusInput();
  };

  /* ----------------------------------------------------------------------------------------------
   * Input events
   * --------------------------------------------------------------------------------------------*/

  const handleFocus = (): void => {
    tabPressedInInput.current = false;
    if (!skipOpenOnFocus.current) openList();
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
    // Focus moving to the list (by assistive technology) keeps it open: the
    // list sends the focus back to the input.
    if (listRef.current?.contains(event.relatedTarget as Node | null)) return;
    closeList();
  };

  // The list never holds the focus. Reached by Tab from the input (the list is
  // rendered after the field), it closes so the focus moves on; reached any
  // other way (assistive technology, script), the focus goes back to the input.
  const handleListFocus = (): void => {
    const byTab = tabPressedInInput.current;
    tabPressedInInput.current = false;
    if (byTab) {
      closeList();
    } else {
      focusInput();
    }
  };

  const handleChange = (text: string): void => {
    setQuery(text);
    if (single && selection.length > 0 && clearable) commit([]);
    openList();
    setActiveKey(null);
  };

  /* ----------------------------------------------------------------------------------------------
   * Keyboard
   * --------------------------------------------------------------------------------------------*/

  const moveActive = (target: "next" | "previous" | "first" | "last"): void => {
    if (navigable.length === 0) return;
    const nextIndex = getNextActiveIndex(target, activeIndex, navigable.length);
    setActiveKey(navigable[nextIndex].key);
  };

  const runKeyAction = (action: ComboboxKeyAction): void => {
    switch (action.type) {
      case "open":
        openList();
        break;
      case "move":
        moveActive(action.target);
        break;
      case "activate":
        if (activeRow) activateRow(activeRow);
        break;
      case "close":
        closeList();
        break;
      case "enterBranch":
        if (activeRow?.kind === "option") {
          enterLevel(
            [...activeRow.ancestors, activeRow.option].map((item) => item.value)
          );
        }
        break;
      case "back":
        goBack();
        break;
      case "removeLast":
        removeValue(selection[selection.length - 1]);
        break;
      case "tab":
        // Tab is not handled: the flag only tells where the focus is going.
        tabPressedInInput.current = true;
        break;
      default:
        break;
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (disabled || event.nativeEvent.isComposing) return;
    const input = event.currentTarget;
    const result = resolveKey(event.key, {
      open,
      hierarchical,
      textEmpty: inputText === "",
      depth: levelPath.length,
      hasActiveRow: Boolean(activeRow),
      activeRowIsBranch: activeRow?.kind === "option" && activeRow.branch,
      caretAtEnd: input.selectionStart === input.value.length,
      multiple,
      selectionCount: selection.length
    });
    if (!result) return;
    if (result.consume) event.preventDefault();
    if (result.stop) event.stopPropagation();
    runKeyAction(result.action);
  };

  /* ----------------------------------------------------------------------------------------------
   * Derived presentation
   * --------------------------------------------------------------------------------------------*/

  const { isSearching, backLabel, groupLabel } = getLevelPresentation({
    hierarchical,
    searching: searchText !== "",
    levelPath,
    index,
    labels
  });

  return {
    fieldRef,
    listRef,
    inputRef,
    open,
    selection,
    inputText,
    hierarchical,
    index,
    rows,
    resultCount: rows.filter((row) => row.kind === "option").length,
    activeRowId,
    getRowId,
    isActive: (row) => activeRow?.key === row.key,
    backLabel,
    groupLabel,
    isSearching,
    activateRow,
    goBack,
    clearSelection,
    removeValue,
    openList,
    focusInput,
    handleFocus,
    handleBlur,
    handleListFocus,
    handleChange,
    handleKeyDown
  };
};
