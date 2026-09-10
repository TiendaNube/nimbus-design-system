import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useId } from "@floating-ui/react";
import { Popover } from "@nimbus-ds/popover";
import { Icon } from "@nimbus-ds/icon";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { input as inputStyles, chip } from "@nimbus-ds/styles";

import { useSharedOptions, type ComboboxOption } from "./useSharedOptions";

// Not `Input` from `@nimbus-ds/input`, and not `Chip` from `@nimbus-ds/chip`
// for the removable selections below: both statically import from
// `@nimbus-ds/icons` (`Input` via its `Input.Search` subcomponent; `Chip`
// directly, for its own dismiss icon), and the Playground's prototype-only
// Storybook build never runs `yarn build:icons` (see the `preview-storybook`
// workflow), so that package has no resolvable build output at CI time —
// the whole bundle fails even though this prototype never renders
// `Input.Search` or asks `Chip` for anything icon-related. This was
// re-verified directly rather than assumed: temporarily rendering the real
// `Chip` here reproduces the exact same failure Input's `Search` variant
// did — `Module not found: Can't resolve '@nimbus-ds/icons' in
// '.../atomic/Chip/src'`.
//
// The fix is the same one used for the field itself: `@nimbus-ds/styles`
// exports the *vanilla-extract classnames* `Chip`/`Input` are themselves
// built from (`chip`/`input`), with zero icon dependency, since they're
// pure CSS. The removable "chip" markup below is Chip.tsx's own JSX
// structure (`chip.classnames.base` + `chip.classnames.chip_close_icon_container`,
// same `Text`/`Icon` props) copied over verbatim, just swapping the real
// `CloseIcon` import for one of this file's own inlined icons — so it is
// pixel-for-pixel the real removable Chip, without importing the component.
//
// For the same reason, the icons below are inlined instead of imported from
// `@nimbus-ds/icons` — these are the same paths as the design system's own
// `close`, `chevron-down`, `plus-circle` and `check` icons, kept local to
// this disposable prototype. Each accepts the usual SVG props so a caller
// can override size (e.g. a smaller dismiss icon inside a tag).
const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path d="m14.41 3.27-.82-.94L8 7.17 2.41 2.33l-.82.94L7.05 8l-5.46 4.73.82.94L8 8.83l5.59 4.84.82-.94L8.95 8z" />
  </svg>
);

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path d="M8 10.18 2.39 4.52l-.89.87 5.59 5.71a1.18 1.18 0 0 0 .86.39 1.13 1.13 0 0 0 .85-.39l5.7-5.7-.88-.89z" />
  </svg>
);

const PlusCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path d="M8.64 4.33H7.39v3.05H4.34v1.25h3.05v3.05h1.25V8.63h3.05V7.38H8.64z" />
    <path d="M8 .5A7.77 7.77 0 0 0 0 8a7.77 7.77 0 0 0 8 7.5A7.77 7.77 0 0 0 16 8 7.77 7.77 0 0 0 8 .5m0 13.75A6.52 6.52 0 0 1 1.25 8 6.52 6.52 0 0 1 8 1.75 6.52 6.52 0 0 1 14.75 8 6.52 6.52 0 0 1 8 14.25" />
  </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path d="m15.12 2.23-9.79 9.78L.88 7.56 0 8.44l5.33 5.34L16 3.11z" />
  </svg>
);

export interface CreatableComboboxProps {
  /** Placeholder shown while no option is selected. */
  placeholder?: string;
  /** Disables the whole control. */
  disabled?: boolean;
  /**
   * Fired whenever the selection changes. Single-select (`multiple` unset
   * or `false`) fires with the option or `null` when cleared. Multiselect
   * fires with the full current array (never `null` — an empty selection
   * is `[]`), on every pick, create, or per-chip removal.
   */
  onChange?: (option: ComboboxOption | ComboboxOption[] | null) => void;
  /**
   * Enables multiselect: selections render as removable tags inside the
   * field instead of filling the input, picking an option checks it
   * in-place rather than replacing the field's value, and the popover
   * stays open after each pick (single-select's own popover-closes-on-pick
   * behavior is unchanged below).
   * @default false
   */
  multiple?: boolean;
  /** An id, useful when a label needs to point at the input. */
  id?: string;
  /** Namespaces the mocked shared store — see the "Two independent fields" story. */
  "data-testid"?: string;
  /**
   * Optional caption shown below the field. Entirely independent of the
   * current selection — this never auto-fills with it, and is free to hold
   * any other guidance (e.g. an instruction or an error message). Omit to
   * show nothing.
   */
  helperText?: React.ReactNode;
  /**
   * Whether typing an unmatched query offers a "Create '…'" affordance.
   * @default true
   */
  allowCreate?: boolean;
  /**
   * Name for the hidden native input(s) this component keeps in sync with
   * the current selection, so it participates in a surrounding form's
   * `FormData` on submit. Single-select renders one hidden input holding
   * the selected option's value; multiselect renders one per selected
   * option, all sharing this `name` — the standard HTML way to get every
   * value back from `FormData.getAll(name)`.
   */
  name?: string;
  /**
   * Marks the field as required for native browser form validation.
   * Applied to the visible text input (not the hidden one): a `type="hidden"`
   * input is exempt from constraint validation per the HTML spec, so the
   * visible field carries `required` instead — it reports empty/non-empty
   * exactly when the hidden field would.
   */
  required?: boolean;
}

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
      multiple = false,
      id,
      "data-testid": dataTestId,
      helperText,
      allowCreate = true,
      name,
      required = false,
    },
    ref
  ) => {
    const { options, createOption } = useSharedOptions();
    const [inputValue, setInputValue] = useState("");
    // Single-select's own selection — untouched by multiselect, and vice
    // versa, so switching `multiple` on an existing field can't leave a
    // stale value from the other mode's state around.
    const [selected, setSelected] = useState<ComboboxOption | null>(null);
    const [selectedMulti, setSelectedMulti] = useState<ComboboxOption[]>([]);
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    // Row hover state, driven in JS rather than CSS `:hover` so each row's
    // treatment (primary for Create, neutral for existing options) can use
    // the same Nimbus `backgroundColor` tokens as everywhere else in Box.
    const [hoveredOptionValue, setHoveredOptionValue] = useState<
      string | null
    >(null);
    const [createHovered, setCreateHovered] = useState(false);
    // Keyboard-driven "active" descendant, per the WAI-ARIA 1.2 combobox
    // pattern — deliberately a separate track from hover above: the two
    // must stay visually distinct (see the row rendering below) since a
    // mouse can hover one row while the keyboard has activated another.
    // -1 means "nothing active yet".
    const [activeIndex, setActiveIndex] = useState(-1);

    const generatedId = useId();
    const baseId = id ?? generatedId;
    const listboxId = `${baseId}-listbox`;
    const getOptionId = (navIndex: number) => `${baseId}-option-${navIndex}`;

    // Keep the visible text in sync if another instance renames/creates the
    // exact option this field has selected (mocked shared store).
    useEffect(() => {
      if (!selected) return;
      const stillThere = options.find((o) => o.value === selected.value);
      if (stillThere && stillThere.label !== inputValue) {
        setInputValue(stillThere.label);
      }
    }, [options, selected, inputValue]);

    // Filtering is label-only, on purpose — no metadata/description search
    // yet. Keep it this way until that's explicitly scoped in.
    const query = inputValue.trim().toLowerCase();
    const filteredOptions = query
      ? options.filter((option) => option.label.toLowerCase().includes(query))
      : options;
    const hasExactMatch = options.some(
      (option) => option.label.toLowerCase() === query
    );
    // `allowCreate={false}` hides the affordance outright, regardless of
    // query — the client decides whether creating new options is on the
    // table at all, not just this field's current input.
    const canCreate = allowCreate && query.length > 0 && !hasExactMatch;

    // The single list the keyboard (and `aria-activedescendant`) navigates,
    // in the same order they're rendered: Create first (when present), then
    // the filtered options. Recomputed on every render from the same
    // `filteredOptions`/`canCreate` the popover content below renders from,
    // so the two can never disagree about what item N is.
    type NavItem =
      | { type: "create" }
      | { type: "option"; option: ComboboxOption };
    const navItems: NavItem[] = useMemo(() => {
      const items: NavItem[] = [];
      if (canCreate) items.push({ type: "create" });
      for (const option of filteredOptions) {
        items.push({ type: "option", option });
      }
      return items;
    }, [canCreate, filteredOptions]);

    const isOptionSelected = useCallback(
      (option: ComboboxOption) =>
        multiple
          ? selectedMulti.some((o) => o.value === option.value)
          : selected?.value === option.value,
      [multiple, selectedMulti, selected]
    );

    // Single-select: picking an option replaces the value, fills the
    // input with its label, and closes the popover (unchanged from
    // before this iteration). Multiselect: picking an option just checks
    // or unchecks it in place — the popover stays open (this is the exact
    // bug found in the existing `MultiSelect`, which closes after every
    // pick) and the input keeps whatever the user typed, since the value
    // now lives in the chips, not the input.
    const selectOption = useCallback(
      (option: ComboboxOption) => {
        if (!multiple) {
          setSelected(option);
          setInputValue(option.label);
          setOpen(false);
          setActiveIndex(-1);
          onChange?.(option);
          return;
        }
        const alreadySelected = selectedMulti.some(
          (o) => o.value === option.value
        );
        const next = alreadySelected
          ? selectedMulti.filter((o) => o.value !== option.value)
          : [...selectedMulti, option];
        setSelectedMulti(next);
        onChange?.(next);
      },
      [multiple, selectedMulti, onChange]
    );

    const handleCreate = useCallback(() => {
      if (!canCreate) return;
      const created = createOption(inputValue);
      // "Creating = selecting", no extra confirmation step, in both modes.
      // Multiselect always ADDS (never toggles off) — the option didn't
      // exist a moment ago, so there's nothing to remove.
      if (multiple) {
        const next = [...selectedMulti, created];
        setSelectedMulti(next);
        onChange?.(next);
        // Unlike picking an *existing* option in multiselect (which
        // deliberately leaves the popover open for more picks), creating
        // clears the query and closes it — same as single-select's own
        // create-and-close below. Leaving the just-typed text sitting next
        // to the brand-new chip, with the popover still open and now also
        // showing that same option — freshly created — as a checked match
        // for its own leftover query, read as a confusing near-duplicate.
        setInputValue("");
        setOpen(false);
        setActiveIndex(-1);
        return;
      }
      setSelected(created);
      setInputValue(created.label);
      setOpen(false);
      setActiveIndex(-1);
      onChange?.(created);
    }, [canCreate, createOption, inputValue, multiple, selectedMulti, onChange]);

    const activateNavItem = useCallback(
      (item: NavItem) => {
        if (item.type === "create") {
          handleCreate();
        } else {
          selectOption(item.option);
        }
      },
      [handleCreate, selectOption]
    );

    const removeChip = useCallback(
      (option: ComboboxOption) => {
        const next = selectedMulti.filter((o) => o.value !== option.value);
        setSelectedMulti(next);
        onChange?.(next);
      },
      [selectedMulti, onChange]
    );

    // Matches the Figma proposal: clearing resets the field to empty AND
    // closed (not back to an open, empty-query list) — the user re-opens it
    // explicitly by clicking or typing again. Single-select only; a chip's
    // own × (see `removeChip`) is multiselect's equivalent per-item.
    const handleClear = useCallback(
      (event?: React.SyntheticEvent) => {
        event?.stopPropagation();
        setSelected(null);
        setInputValue("");
        setOpen(false);
        setActiveIndex(-1);
        onChange?.(null);
      },
      [onChange]
    );

    // WAI-ARIA 1.2 combobox authoring practice: arrow keys move a roving
    // `aria-activedescendant` rather than moving focus, Enter activates
    // whatever is currently active (never "just the first match" — that was
    // last iteration's shortcut, and broke as soon as the active item
    // wasn't index 0), Escape closes, Home/End jump to the ends.
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
          case "Escape": {
            setOpen(false);
            setActiveIndex(-1);
            return;
          }
          case "ArrowDown": {
            event.preventDefault();
            if (!open) {
              setOpen(true);
              setActiveIndex(navItems.length ? 0 : -1);
              return;
            }
            setActiveIndex((current) => {
              if (navItems.length === 0) return -1;
              if (current === -1) return 0;
              return Math.min(current + 1, navItems.length - 1);
            });
            return;
          }
          case "ArrowUp": {
            event.preventDefault();
            if (!open) {
              setOpen(true);
              setActiveIndex(navItems.length ? navItems.length - 1 : -1);
              return;
            }
            setActiveIndex((current) => {
              if (navItems.length === 0) return -1;
              if (current === -1) return navItems.length - 1;
              return Math.max(current - 1, 0);
            });
            return;
          }
          case "Home": {
            if (!open || navItems.length === 0) return;
            event.preventDefault();
            setActiveIndex(0);
            return;
          }
          case "End": {
            if (!open || navItems.length === 0) return;
            event.preventDefault();
            setActiveIndex(navItems.length - 1);
            return;
          }
          case "Enter": {
            event.preventDefault();
            if (!open) return;
            const active = navItems[activeIndex];
            if (active) activateNavItem(active);
            return;
          }
          case "Backspace": {
            // Multiselect only, and only once the query is already empty —
            // otherwise this is just normal text editing.
            if (!multiple || inputValue !== "" || selectedMulti.length === 0) {
              return;
            }
            const next = selectedMulti.slice(0, -1);
            setSelectedMulti(next);
            onChange?.(next);
            return;
          }
          default:
            return;
        }
      },
      [
        open,
        navItems,
        activeIndex,
        activateNavItem,
        multiple,
        inputValue,
        selectedMulti,
        onChange,
      ]
    );

    return (
      <Box ref={ref} display="flex" flexDirection="column" gap="1" width="100%">
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
              role="listbox"
              id={listboxId}
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
              {/* The create affordance comes first, styled as a link/action
                  (not a plain option) — matching the Figma proposal, where
                  typing an unmatched query surfaces "Crear '…'" ahead of any
                  remaining filtered matches. It's still part of the same
                  roving-focus listbox as the options below (nav index 0),
                  just visually distinct. */}
              {canCreate && (
                <Box
                  as="button"
                  type="button"
                  id={getOptionId(0)}
                  role="option"
                  aria-selected={false}
                  data-testid={dataTestId ? `${dataTestId}-create` : undefined}
                  // These rows are real `<button>`s (native click/Enter/Space
                  // support), so a mouse click would otherwise move DOM focus
                  // onto the row itself and off the input — breaking the
                  // input's own onKeyDown (Backspace-removes-last-chip,
                  // arrow nav) right after a pick. preventDefault on
                  // mousedown stops that focus shift; the click still fires.
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={handleCreate}
                  onMouseEnter={() => setCreateHovered(true)}
                  onMouseLeave={() => setCreateHovered(false)}
                  display="flex"
                  alignItems="center"
                  gap="2"
                  width="100%"
                  boxSizing="border-box"
                  padding="2"
                  borderRadius="2"
                  borderWidth="none"
                  cursor="pointer"
                  textAlign="left"
                  // Create hovers with the PRIMARY treatment (mouse), and
                  // gets the PRIMARY highlight tint — one shade stronger —
                  // when it's the keyboard-active item. An explicit rest
                  // value (matching the popover's own background) is
                  // required here too: leaving it `undefined` drops Box's
                  // background class entirely and the browser's native
                  // unstyled-`<button>` grey shows through instead.
                  backgroundColor={
                    activeIndex === 0
                      ? "primary-surfaceHighlight"
                      : createHovered
                        ? "primary-surface"
                        : "neutral-background"
                  }
                >
                  <Icon
                    source={<PlusCircleIcon />}
                    color="primary-interactive"
                  />
                  <Text color="primary-interactive">{`Create "${inputValue.trim()}"`}</Text>
                </Box>
              )}
              {filteredOptions.map((option, index) => {
                const navIndex = (canCreate ? 1 : 0) + index;
                const isActive = activeIndex === navIndex;
                const isHovered = hoveredOptionValue === option.value;
                const isChecked = isOptionSelected(option);
                return (
                  <Box
                    as="button"
                    type="button"
                    key={option.value}
                    id={getOptionId(navIndex)}
                    role="option"
                    aria-selected={isChecked}
                    data-testid={
                      dataTestId
                        ? `${dataTestId}-option-${option.value}`
                        : undefined
                    }
                    // Same focus-preserving guard as the Create row above —
                    // matters even more here, since multiselect keeps the
                    // popover open across several picks in a row.
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectOption(option)}
                    onMouseEnter={() => setHoveredOptionValue(option.value)}
                    onMouseLeave={() => setHoveredOptionValue(null)}
                    display="flex"
                    alignItems="center"
                    justifyContent={multiple ? "space-between" : undefined}
                    gap="2"
                    width="100%"
                    boxSizing="border-box"
                    padding="2"
                    borderRadius="2"
                    borderWidth="none"
                    cursor="pointer"
                    textAlign="left"
                    // Existing options hover with the NEUTRAL treatment
                    // (mouse), and get the NEUTRAL highlight tint — one
                    // shade stronger — when active via keyboard. See the
                    // comment on the Create row above for why the rest
                    // value can't be left `undefined`.
                    backgroundColor={
                      isActive
                        ? "neutral-surfaceHighlight"
                        : isHovered
                          ? "neutral-surface"
                          : "neutral-background"
                    }
                  >
                    <Text color="neutral-textHigh">{option.label}</Text>
                    {/* Multiselect only, per the design decision: a picked
                        option gets a checkmark and STAYS in the list — it
                        never disappears the way single-select's implicit
                        "already the value" does. */}
                    {multiple && isChecked && (
                      <Icon source={<CheckIcon />} color="primary-interactive" />
                    )}
                  </Box>
                );
              })}
            </div>
          }
        >
          <Box
            display="flex"
            alignItems={multiple ? "flex-start" : "center"}
            gap="1"
            width="100%"
          >
            <div style={{ flex: "1 1 auto", minWidth: 0 }}>
              <div
                // Single-select's left inset comes from `classnames.input`'s
                // own padding, since the `<input>` is the container's only
                // child there. Multiselect puts chips ahead of it as
                // siblings in the same flex row, and the container itself
                // carries no padding of its own — so without this, the
                // first chip sits flush against the border. Reusing
                // `container__icon_append.start` (`paddingLeft:
                // spacing[2]`) matches both Input's own icon-prepend
                // convention and MultiSelect's own field padding, rather
                // than a one-off pixel value.
                className={[
                  inputStyles.classnames.appearance.neutral,
                  multiple
                    ? inputStyles.classnames.container__icon_append.start
                    : null,
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={
                  multiple
                    ? {
                        flexWrap: "wrap",
                        alignItems: "center",
                        rowGap: 4,
                        paddingBlock: 4,
                      }
                    : undefined
                }
              >
                {/* Multiselect's picks render as removable chips INSIDE the
                    field, ahead of the text input — Chip's own markup and
                    classnames (see the import comment up top for why this
                    isn't literally the `Chip` component). */}
                {multiple &&
                  selectedMulti.map((option) => (
                    <div key={option.value} className={chip.classnames.base}>
                      <Text
                        color="neutral-textHigh"
                        fontSize="caption"
                        lineHeight="caption"
                        lineClamp={1}
                        wordBreak="break-all"
                      >
                        {option.label}
                      </Text>
                      <button
                        aria-label={`Remove ${option.label}`}
                        data-testid={
                          dataTestId
                            ? `${dataTestId}-chip-remove-${option.value}`
                            : undefined
                        }
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={(event) => {
                          event.stopPropagation();
                          removeChip(option);
                        }}
                        className={chip.classnames.chip_close_icon_container}
                      >
                        <Icon
                          data-testid={
                            dataTestId
                              ? `${dataTestId}-chip-close-${option.value}`
                              : undefined
                          }
                          source={<CloseIcon width={12} height={12} />}
                          color="neutral-textHigh"
                        />
                      </button>
                    </div>
                  ))}
                <input
                  ref={inputRef}
                  id={id}
                  data-testid={dataTestId}
                  className={inputStyles.classnames.input}
                  style={
                    multiple
                      ? { width: "auto", flex: "1 1 100px", minWidth: 60 }
                      : undefined
                  }
                  value={inputValue}
                  placeholder={
                    multiple && selectedMulti.length > 0 ? "" : placeholder
                  }
                  disabled={disabled}
                  required={required}
                  role="combobox"
                  aria-expanded={open}
                  aria-haspopup="listbox"
                  aria-controls={listboxId}
                  aria-activedescendant={
                    open && activeIndex >= 0
                      ? getOptionId(activeIndex)
                      : undefined
                  }
                  onFocus={() => !disabled && setOpen(true)}
                  onChange={(event) => {
                    setInputValue(event.target.value);
                    if (!multiple && selected) setSelected(null);
                    setOpen(true);
                    setActiveIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                />
                {/* Single-select: one trailing affordance that swaps role
                    with selection state, matching the Figma proposal — a
                    closed field shows a chevron (click focuses/opens it);
                    once a value is selected or created, the same slot
                    becomes the × that clears it. Multiselect clears
                    per-chip instead (see above), so this slot is always
                    just the decorative chevron there. */}
                {!multiple && selected && !disabled ? (
                  <button
                    type="button"
                    aria-label="Clear selection"
                    data-testid={dataTestId ? `${dataTestId}-clear` : undefined}
                    onClick={handleClear}
                    className={[
                      inputStyles.classnames.container__icon,
                      inputStyles.classnames.container__icon_append.end,
                    ].join(" ")}
                  >
                    <Icon source={<CloseIcon />} color="neutral-textLow" />
                  </button>
                ) : (
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
                    <Icon source={<ChevronDownIcon />} color="neutral-textLow" />
                  </button>
                )}
              </div>
            </div>
          </Box>
        </Popover>
        {/* Keeps this field visible to a native <form>: nothing renders
            when there's no `name` (an unnamed hidden input contributes
            nothing to FormData). Multiselect renders one hidden input per
            selected option, all sharing `name` — `FormData.getAll(name)`
            is the standard way to read every value back on submit. */}
        {name &&
          (multiple ? (
            selectedMulti.map((option) => (
              <input
                key={option.value}
                type="hidden"
                name={name}
                value={option.value}
              />
            ))
          ) : (
            <input type="hidden" name={name} value={selected?.value ?? ""} />
          ))}
        {/* Independent of `selected` on purpose — see the prop doc above
            and the pull request: an earlier iteration echoed the current
            selection here, which the design review flagged since a field's
            helper text should be free-standing, optional caption content,
            not a mirror of the value already visible in the input. */}
        {helperText && (
          <Text fontSize="caption" color="neutral-textLow">
            {helperText}
          </Text>
        )}
      </Box>
    );
  }
);

CreatableCombobox.displayName = "CreatableCombobox";

export { CreatableCombobox };
