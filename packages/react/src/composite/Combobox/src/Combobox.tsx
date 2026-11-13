import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo
} from "react";
import { useMergeRefs } from "@floating-ui/react";
import { combobox, input as inputStyles } from "@nimbus-ds/styles";
import { Popover } from "@nimbus-ds/popover";
import { Tag } from "@nimbus-ds/tag";

import type { ComboboxLabels, ComboboxProps } from "./combobox.types";
import {
  ComboboxChips,
  ComboboxHiddenInputs,
  ComboboxList,
  ComboboxTextInput,
  ComboboxTrailing
} from "./components";
import { useCombobox } from "./hooks";
import {
  DEFAULT_LABELS,
  PATH_TEXT_SEPARATOR,
  getPath,
  getTrailingControl,
  joinClassNames,
  joinPath,
  toSelection
} from "./utils";

const POPOVER_OFFSET = 4;

/**
 * Overrides the default labels with the ones that are defined.
 */
const resolveLabels = (
  labels: Partial<ComboboxLabels> | undefined
): ComboboxLabels => {
  const defined = Object.fromEntries(
    Object.entries(labels ?? {}).filter(([, text]) => text !== undefined)
  );
  return { ...DEFAULT_LABELS, ...defined };
};

/**
 * Combobox lets a person choose one value, or several, from a list of options
 * by typing to filter it. It can create options that do not exist yet, show
 * options with a subtitle and a tag, and drill down through a hierarchy of up
 * to six levels.
 *
 * @example
 * <Combobox
 *   aria-label="Category"
 *   options={[{ value: "bags", label: "Bags" }]}
 *   onChange={(option) => console.log(option)}
 * />
 */
const Combobox = forwardRef<HTMLInputElement, ComboboxProps>((props, ref) => {
  const {
    options,
    onCreate,
    clearable = true,
    filter,
    selectableBranches = true,
    placeholder,
    disabled = false,
    appearance = "neutral",
    name,
    required = false,
    id,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    labels: labelsProp,
    "data-testid": dataTestId
  } = props;
  const multiple = props.multiple === true;
  const labels = useMemo(() => resolveLabels(labelsProp), [labelsProp]);

  const baseId = useId().replace(/:/g, "");
  const inputId = id ?? `${baseId}-input`;
  const listboxId = `${baseId}-listbox`;

  const onSelectionChange = useCallback(
    (next: ReturnType<typeof toSelection>) => {
      if (props.multiple === true) {
        props.onChange?.(next);
      } else {
        props.onChange?.(next[0] ?? null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.multiple, props.onChange]
  );

  const model = useCombobox({
    options,
    multiple,
    value: props.value === undefined ? undefined : toSelection(props.value),
    defaultValue: toSelection(props.defaultValue),
    onSelectionChange,
    onCreate,
    clearable,
    filter,
    selectableBranches,
    disabled,
    labels,
    baseId
  });
  const { selection, inputRef, index, open } = model;

  const setInputRef = useMergeRefs([inputRef, ref]);

  // The field is invalid without a value, whatever text is typed.
  const hasValue = selection.length > 0;
  useEffect(() => {
    inputRef.current?.setCustomValidity(
      required && !hasValue ? labels.required : ""
    );
  }, [inputRef, required, hasValue, labels.required]);

  const single = !multiple;
  const selected = single ? selection[0] : undefined;
  const selectedPath = selected ? getPath(selected, index) : [];
  const hasValuePath = single && selectedPath.length > 1;
  // The path is painted over the input while the selected label is shown.
  const showValuePath = hasValuePath && model.inputText === selected?.label;
  const pathDescriptionId = `${baseId}-path`;
  const describedBy =
    [ariaDescribedBy, hasValuePath ? pathDescriptionId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const trailingControl = getTrailingControl({
    multiple,
    selectionCount: selection.length,
    clearable,
    disabled
  });

  const handleFieldClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (disabled || (event.target as HTMLElement).closest("button")) return;
    inputRef.current?.focus();
    model.openList();
  };

  const handleFieldMouseDown = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    // Only the text input takes the focus; the rest of the field sends it there.
    if (event.target !== inputRef.current) event.preventDefault();
  };

  const fieldClassName = joinClassNames(
    inputStyles.classnames.appearance[appearance],
    combobox.classnames.field,
    multiple && combobox.classnames.fieldMultiple,
    disabled && combobox.classnames.fieldDisabled
  );

  const textInput = (
    <ComboboxTextInput
      model={model}
      inputRef={setInputRef}
      id={inputId}
      listboxId={listboxId}
      multiple={multiple}
      placeholder={multiple && hasValue ? undefined : placeholder}
      disabled={disabled}
      required={required}
      valuePath={showValuePath ? selectedPath : undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={describedBy}
      data-testid={dataTestId}
    />
  );

  return (
    <div className={combobox.classnames.root}>
      <Popover
        visible={open && !disabled}
        enabledClick={false}
        enabledDismiss={false}
        arrow={false}
        matchReferenceWidth
        position="bottom-start"
        offset={POPOVER_OFFSET}
        padding="none"
        content={
          <ComboboxList
            model={model}
            labels={labels}
            multiple={multiple}
            listboxId={listboxId}
            listRef={model.listRef}
          />
        }
      >
        {/* The click and mouse down handlers send the pointer to the text input. */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          ref={model.fieldRef}
          className={fieldClassName}
          onClick={handleFieldClick}
          onMouseDown={handleFieldMouseDown}
        >
          <div className={combobox.classnames.content}>
            {multiple && (
              <ComboboxChips
                selection={selection}
                index={index}
                baseId={baseId}
                disabled={disabled}
                labels={labels}
                onRemove={model.removeValue}
              />
            )}
            {textInput}
          </div>
          {single && selected?.tag && (
            <span className={combobox.classnames.fieldTag}>
              <Tag appearance={selected.tag.appearance}>
                {selected.tag.label}
              </Tag>
            </span>
          )}
          <ComboboxTrailing
            control={trailingControl}
            label={
              trailingControl === "clear"
                ? labels.clearSelection
                : labels.clearAll
            }
            onClear={model.clearSelection}
          />
        </div>
      </Popover>
      {hasValuePath && (
        <span id={pathDescriptionId} hidden>
          {joinPath(selectedPath, PATH_TEXT_SEPARATOR)}
        </span>
      )}
      <ComboboxHiddenInputs
        name={name}
        selection={selection}
        multiple={multiple}
      />
    </div>
  );
});

Combobox.displayName = "Combobox";

export { Combobox };
