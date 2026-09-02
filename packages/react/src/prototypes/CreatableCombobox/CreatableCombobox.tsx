import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Popover } from "@nimbus-ds/popover";
import { Icon } from "@nimbus-ds/icon";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { input as inputStyles } from "@nimbus-ds/styles";

import { useSharedOptions, type ComboboxOption } from "./useSharedOptions";

// Not `Input` from `@nimbus-ds/input`: that component's own file statically
// imports its `Input.Search` subcomponent, which in turn imports
// `@nimbus-ds/icons` — and the Playground's prototype-only Storybook build
// never runs `yarn build:icons` (see the `preview-storybook` workflow), so
// that package has no resolvable build output at CI time, and the whole
// bundle fails even though this prototype never renders `Input.Search`.
// Using the same `input` vanilla-extract classnames `Input` itself is built
// on (from `@nimbus-ds/styles`, which has no icon dependency) keeps the exact
// visual result while side-stepping that transitive import.
//
// For the same reason, the icons below are inlined instead of imported from
// `@nimbus-ds/icons` — these are the same paths as the design system's own
// `close`, `search` and `plus-circle` icons, kept local to this disposable
// prototype.
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="m14.91 13.09-3.68-3.21a4.86 4.86 0 0 0 .86-2.77A5.34 5.34 0 0 0 6.59 2a5.35 5.35 0 0 0-5.5 5.15 5.34 5.34 0 0 0 5.5 5.15 5.7 5.7 0 0 0 3.82-1.44L14.08 14zM6.59 11a4.09 4.09 0 0 1-4.25-3.9 4.09 4.09 0 0 1 4.25-3.9 4.09 4.09 0 0 1 4.25 3.9A4.08 4.08 0 0 1 6.59 11" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="m14.41 3.27-.82-.94L8 7.17 2.41 2.33l-.82.94L7.05 8l-5.46 4.73.82.94L8 8.83l5.59 4.84.82-.94L8.95 8z" />
  </svg>
);

const PlusCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.64 4.33H7.39v3.05H4.34v1.25h3.05v3.05h1.25V8.63h3.05V7.38H8.64z" />
    <path d="M8 .5A7.77 7.77 0 0 0 0 8a7.77 7.77 0 0 0 8 7.5A7.77 7.77 0 0 0 16 8 7.77 7.77 0 0 0 8 .5m0 13.75A6.52 6.52 0 0 1 1.25 8 6.52 6.52 0 0 1 8 1.75 6.52 6.52 0 0 1 14.75 8 6.52 6.52 0 0 1 8 14.25" />
  </svg>
);

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
            <div className={inputStyles.classnames.appearance.neutral}>
              <input
                ref={inputRef}
                id={id}
                data-testid={dataTestId}
                className={inputStyles.classnames.input}
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
              />
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => inputRef.current?.focus()}
                className={[
                  inputStyles.classnames.container__icon,
                  inputStyles.classnames.container__icon_append.end,
                ].join(" ")}
              >
                <Icon source={<SearchIcon />} color="neutral-textLow" />
              </button>
            </div>
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
