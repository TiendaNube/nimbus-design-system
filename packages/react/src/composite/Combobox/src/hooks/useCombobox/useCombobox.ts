import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import type { ComboboxOption } from "../../combobox.types";
import {
  MAX_LEVELS,
  buildIndex,
  defaultFilter,
  fillLabel,
  getLevelOptions,
  hasEqualLabel,
  hasHierarchy,
  isBranch,
  searchTree
} from "../../utils";
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

  if (params.canCreate && trimmed !== "" && !hierarchical) {
    if (!hasEqualLabel(params.options, trimmed)) {
      rows.push({ kind: "create", key: "create", text: trimmed });
    }
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

  const initialLevel = (): string[] => {
    const selected = single ? selection[0] : undefined;
    const entry = selected ? index.get(selected.value) : undefined;
    return entry ? entry.ancestors.map((ancestor) => ancestor.value) : [];
  };

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
    const isSelected = selection.some((item) => item.value === option.value);
    if (!isSelected) {
      commit([...selection, option]);
    } else if (canToggle) {
      commit(selection.filter((item) => item.value !== option.value));
    }
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
    if (!skipOpenOnFocus.current) openList();
  };

  const handleBlur = (): void => {
    closeList();
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

  const consume = (event: KeyboardEvent<HTMLInputElement>): void => {
    event.preventDefault();
  };

  const moveActive = (target: "next" | "previous" | "first" | "last"): void => {
    if (navigable.length === 0) return;
    const last = navigable.length - 1;
    const nextIndex = {
      next: Math.min(activeIndex + 1, last),
      previous: activeIndex < 0 ? last : Math.max(activeIndex - 1, 0),
      first: 0,
      last
    }[target];
    setActiveKey(navigable[nextIndex].key);
  };

  const handleVertical = (
    event: KeyboardEvent<HTMLInputElement>,
    target: "next" | "previous"
  ): void => {
    consume(event);
    if (!open) {
      openList();
      return;
    }
    moveActive(target);
  };

  const handleEscape = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (!open) return;
    consume(event);
    event.stopPropagation();
    closeList();
  };

  const handleArrowRight = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (!open || !hierarchical || activeRow?.kind !== "option") return;
    if (!activeRow.branch) return;
    const input = event.currentTarget;
    const atEnd = input.selectionStart === input.value.length;
    if (inputText !== "" && !atEnd) return;
    consume(event);
    enterLevel(
      [...activeRow.ancestors, activeRow.option].map((item) => item.value)
    );
  };

  const handleBack = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (!open || !hierarchical || inputText !== "" || levelPath.length === 0) {
      return;
    }
    consume(event);
    goBack();
  };

  const handleBackspace = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (inputText !== "") return;
    if (open && hierarchical && levelPath.length > 0) {
      handleBack(event);
      return;
    }
    if (multiple && selection.length > 0) {
      consume(event);
      removeValue(selection[selection.length - 1]);
    }
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (!open || !activeRow) return;
    consume(event);
    activateRow(activeRow);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (disabled || event.nativeEvent.isComposing) return;
    switch (event.key) {
      case "ArrowDown":
        handleVertical(event, "next");
        break;
      case "ArrowUp":
        handleVertical(event, "previous");
        break;
      case "Home":
      case "End":
        if (open) {
          consume(event);
          moveActive(event.key === "Home" ? "first" : "last");
        }
        break;
      case "Enter":
        handleEnter(event);
        break;
      case "Escape":
        handleEscape(event);
        break;
      case "ArrowRight":
        handleArrowRight(event);
        break;
      case "ArrowLeft":
        handleBack(event);
        break;
      case "Backspace":
        handleBackspace(event);
        break;
      default:
        break;
    }
  };

  /* ----------------------------------------------------------------------------------------------
   * Derived presentation
   * --------------------------------------------------------------------------------------------*/

  const isSearching = hierarchical && searchText !== "";
  const levelName = (position: number): string =>
    index.get(levelPath[position] ?? "")?.option.label ?? "";
  let backLabel: string | null = null;
  if (hierarchical && !isSearching && levelPath.length === 1) {
    backLabel = labels.back;
  } else if (hierarchical && !isSearching && levelPath.length > 1) {
    backLabel = fillLabel(labels.backTo, {
      name: levelName(levelPath.length - 2)
    });
  }
  const groupLabel =
    hierarchical && !isSearching && levelPath.length > 0
      ? levelName(levelPath.length - 1)
      : labels.results;

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
    handleChange,
    handleKeyDown
  };
};
