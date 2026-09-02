import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Popover } from "@nimbus-ds/popover";
import { Input } from "@nimbus-ds/input";
import { Icon } from "@nimbus-ds/icon";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { SearchIcon, CloseIcon, PlusCircleIcon } from "@nimbus-ds/icons";

import { useSharedOptions, type ComboboxOption } from "./useSharedOptions";

export interface CreatableComboboxProps {
  /** Placeholder shown while no option is selected. */
  placeholder?: string;
  /** Disables the whole control. */
  disabled?: boolean;
  /** Fired whenever the selection changes — including clearing (`null`). */
  onChange?: (option: ComboboxOption | null) => void;
  /** An id, useful when a label needs to point at the input. */
  id?: string;
  /** Namespaces the mocked shared store — see the "Two independent fields" story. */
  "data-testid"?: string;
}

const optionButtonStyle: React.CSSProperties = {
  all: "unset",
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
  boxSizing: "border-box",
  padding: "8px 12px",
  borderRadius: 4,
  cursor: "pointer",
  textAlign: "left",
};

const clearButtonStyle: React.CSSProperties = {
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  padding: 6,
  borderRadius: 4,
  flexShrink: 0,
};

/**
 * CreatableCombobox — Nimbus Playground prototype for GitHub issue #508
 * ("Creatable Autocomplete / Select Component").
 *
 * Text input + filtered dropdown list, backed by a mocked *shared* option
 * store (see `useSharedOptions`): typing filters the list, an unmatched
 * query offers a "Create '<text>'" affordance that adds the option to the
 * shared store and selects it, and a selected value can be cleared back to
 * an empty search. See the prototype's pull request for what is mocked.
 */
const CreatableCombobox = forwardRef<HTMLDivElement, CreatableComboboxProps>(
  (
    {
      placeholder = "Search or create a tag",
      disabled = false,
      onChange,
      id,
      "data-testid": dataTestId,
    },
    ref
  ) => {
    const { options, createOption } = useSharedOptions();
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState<ComboboxOption | null>(null);
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Keep the visible text in sync if another instance renames/creates the
    // exact option this field has selected (mocked shared store).
    useEffect(() => {
      if (!selected) return;
      const stillThere = options.find((o) => o.value === selected.value);
      if (stillThere && stillThere.label !== inputValue) {
        setInputValue(stillThere.label);
      }
    }, [options, selected, inputValue]);

    const query = inputValue.trim().toLowerCase();
    const filteredOptions = query
      ? options.filter((option) => option.label.toLowerCase().includes(query))
      : options;
    const hasExactMatch = options.some(
      (option) => option.label.toLowerCase() === query
    );
    const canCreate = query.length > 0 && !hasExactMatch;

    const commitSelection = useCallback(
      (option: ComboboxOption) => {
        setSelected(option);
        setInputValue(option.label);
        setOpen(false);
        onChange?.(option);
      },
      [onChange]
    );

    const handleCreate = useCallback(() => {
      if (!canCreate) return;
      const created = createOption(inputValue);
      commitSelection(created);
    }, [canCreate, createOption, inputValue, commitSelection]);

    const handleClear = useCallback(
      (event?: React.SyntheticEvent) => {
        event?.stopPropagation();
        setSelected(null);
        setInputValue("");
        onChange?.(null);
        setOpen(true);
        inputRef.current?.focus();
      },
      [onChange]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
          setOpen(false);
          return;
        }
        if (event.key === "Enter") {
          event.preventDefault();
          if (filteredOptions[0]) {
            commitSelection(filteredOptions[0]);
          } else if (canCreate) {
            handleCreate();
          }
        }
      },
      [filteredOptions, canCreate, commitSelection, handleCreate]
    );

    return (
      <Popover
        visible={open && !disabled}
        onVisibility={(visible) => setOpen(visible && !disabled)}
        enabledClick={false}
        matchReferenceWidth
        arrow={false}
        padding="none"
        overflow="hidden"
        offset={4}
        content={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              boxSizing: "border-box",
              padding: 4,
              gap: 4,
              maxHeight: 220,
              overflowY: "auto",
            }}
          >
            {filteredOptions.length === 0 && !canCreate && (
              <Box padding="2">
                <Text fontSize="caption" color="neutral-textLow">
                  No matching tags
                </Text>
              </Box>
            )}
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                data-testid={
                  dataTestId ? `${dataTestId}-option-${option.value}` : undefined
                }
                onClick={() => commitSelection(option)}
                style={optionButtonStyle}
              >
                <Text color="currentColor">{option.label}</Text>
              </button>
            ))}
            {canCreate && (
              <button
                type="button"
                data-testid={dataTestId ? `${dataTestId}-create` : undefined}
                onClick={handleCreate}
                style={optionButtonStyle}
              >
                <Icon source={<PlusCircleIcon />} color="currentColor" />
                <Text color="currentColor">{`Create "${inputValue.trim()}"`}</Text>
              </button>
            )}
          </div>
        }
      >
        <Box ref={ref} display="flex" alignItems="center" gap="1" width="100%">
          <div style={{ flex: "1 1 auto", minWidth: 0 }}>
            <Input
              ref={inputRef}
              id={id}
              data-testid={dataTestId}
              value={inputValue}
              placeholder={placeholder}
              disabled={disabled}
              role="combobox"
              aria-expanded={open}
              aria-haspopup="listbox"
              onFocus={() => !disabled && setOpen(true)}
              onChange={(event) => {
                setInputValue(event.target.value);
                if (selected) setSelected(null);
                setOpen(true);
              }}
              onKeyDown={handleKeyDown}
              append={<Icon source={<SearchIcon />} color="neutral-textLow" />}
              appendPosition="end"
            />
          </div>
          {selected && !disabled && (
            <button
              type="button"
              aria-label="Clear selection"
              data-testid={dataTestId ? `${dataTestId}-clear` : undefined}
              onClick={handleClear}
              style={clearButtonStyle}
            >
              <Icon source={<CloseIcon />} color="neutral-textLow" />
            </button>
          )}
        </Box>
      </Popover>
    );
  }
);

CreatableCombobox.displayName = "CreatableCombobox";

export { CreatableCombobox };
