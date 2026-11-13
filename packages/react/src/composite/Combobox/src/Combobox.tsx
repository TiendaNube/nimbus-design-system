import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo
} from "react";
import { useMergeRefs } from "@floating-ui/react";
import { combobox, input as inputStyles } from "@nimbus-ds/styles";
import { Chip } from "@nimbus-ds/chip";
import { Icon } from "@nimbus-ds/icon";
import { Popover } from "@nimbus-ds/popover";
import { Tag } from "@nimbus-ds/tag";
import { ChevronDownIcon, CloseIcon } from "@nimbus-ds/icons";

import type { ComboboxLabels, ComboboxProps } from "./combobox.types";
import { ComboboxList, ComboboxValuePath } from "./components";
import { useCombobox } from "./hooks";
import {
  CHIP_PATH_SEPARATOR,
  DEFAULT_LABELS,
  PATH_TEXT_SEPARATOR,
  fillLabel,
  getPath,
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

  const labelCount = selection.reduce<Record<string, number>>(
    (counts, option) => ({
      ...counts,
      [option.label]: (counts[option.label] ?? 0) + 1
    }),
    {}
  );

  const showClear = single && hasValue && clearable && !disabled;
  const showClearAll = multiple && selection.length >= 2 && !disabled;

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

  const fieldClassName = [
    inputStyles.classnames.appearance[appearance],
    combobox.classnames.field,
    multiple ? combobox.classnames.fieldMultiple : null,
    disabled ? combobox.classnames.fieldDisabled : null
  ]
    .filter(Boolean)
    .join(" ");

  const textInput = (
    <span
      className={[
        combobox.classnames.inputBox,
        multiple ? combobox.classnames.inputBoxMultiple : null
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showValuePath && <ComboboxValuePath path={selectedPath} />}
      <input
        ref={setInputRef}
        id={inputId}
        data-testid={dataTestId}
        className={[
          combobox.classnames.input,
          multiple ? combobox.classnames.inputMultiple : null,
          showValuePath ? combobox.classnames.inputPathHidden : null
        ]
          .filter(Boolean)
          .join(" ")}
        type="text"
        role="combobox"
        autoComplete="off"
        value={model.inputText}
        placeholder={multiple && hasValue ? undefined : placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listboxId : undefined}
        aria-autocomplete="list"
        aria-activedescendant={open ? model.activeRowId : undefined}
        onFocus={model.handleFocus}
        onBlur={model.handleBlur}
        onClick={model.openList}
        onChange={(event) => model.handleChange(event.target.value)}
        onKeyDown={model.handleKeyDown}
      />
    </span>
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
            {multiple &&
              selection.map((option, position) => {
                const path = getPath(option, index);
                const descriptionId = `${baseId}-chip-${position}`;
                const text =
                  labelCount[option.label] > 1
                    ? joinPath(path, CHIP_PATH_SEPARATOR)
                    : option.label;
                return (
                  <React.Fragment key={option.value}>
                    <Chip
                      text={text}
                      removable={!disabled}
                      removeLabel={fillLabel(labels.removeChip, {
                        name: option.label
                      })}
                      aria-describedby={descriptionId}
                      onClick={(event) => {
                        event.stopPropagation();
                        model.removeValue(option);
                      }}
                    />
                    <span id={descriptionId} hidden>
                      {joinPath(path, PATH_TEXT_SEPARATOR)}
                    </span>
                  </React.Fragment>
                );
              })}
            {textInput}
          </div>
          {single && selected?.tag && (
            <span className={combobox.classnames.fieldTag}>
              <Tag appearance={selected.tag.appearance}>
                {selected.tag.label}
              </Tag>
            </span>
          )}
          {showClear || showClearAll ? (
            <button
              type="button"
              className={[
                combobox.classnames.trailing,
                combobox.classnames.trailingButton
              ].join(" ")}
              aria-label={showClear ? labels.clearSelection : labels.clearAll}
              onClick={(event) => {
                event.stopPropagation();
                model.clearSelection();
              }}
            >
              <Icon source={<CloseIcon />} color="neutral-textLow" />
            </button>
          ) : (
            <span className={combobox.classnames.trailing} aria-hidden="true">
              <Icon source={<ChevronDownIcon />} color="neutral-textLow" />
            </span>
          )}
        </div>
      </Popover>
      {hasValuePath && (
        <span id={pathDescriptionId} hidden>
          {joinPath(selectedPath, PATH_TEXT_SEPARATOR)}
        </span>
      )}
      {name &&
        selection.map((option) => (
          <input
            key={option.value}
            type="hidden"
            name={name}
            value={option.value}
          />
        ))}
      {name && single && !hasValue && (
        <input type="hidden" name={name} value="" />
      )}
    </div>
  );
});

Combobox.displayName = "Combobox";

export { Combobox };
