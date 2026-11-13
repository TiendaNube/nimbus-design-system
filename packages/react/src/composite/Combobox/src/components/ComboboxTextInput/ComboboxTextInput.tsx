import React from "react";
import { combobox } from "@nimbus-ds/styles";

import { joinClassNames } from "../../utils";
import { ComboboxValuePath } from "../ComboboxValuePath";
import type { ComboboxTextInputProps } from "./ComboboxTextInput.types";

/**
 * The text input of the field, with the path of a hierarchical value painted
 * over it.
 */
const ComboboxTextInput: React.FC<ComboboxTextInputProps> = ({
  model,
  inputRef,
  id,
  listboxId,
  multiple,
  placeholder,
  disabled,
  required,
  valuePath,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "data-testid": dataTestId
}) => (
  <span
    className={joinClassNames(
      combobox.classnames.inputBox,
      multiple && combobox.classnames.inputBoxMultiple
    )}
  >
    {valuePath && <ComboboxValuePath path={valuePath} />}
    <input
      ref={inputRef}
      id={id}
      data-testid={dataTestId}
      className={joinClassNames(
        combobox.classnames.input,
        multiple && combobox.classnames.inputMultiple,
        valuePath && combobox.classnames.inputPathHidden
      )}
      type="text"
      role="combobox"
      autoComplete="off"
      value={model.inputText}
      placeholder={placeholder}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-required={required || undefined}
      aria-expanded={model.open}
      aria-haspopup="listbox"
      aria-controls={model.open ? listboxId : undefined}
      aria-autocomplete="list"
      aria-activedescendant={model.open ? model.activeRowId : undefined}
      onFocus={model.handleFocus}
      onBlur={model.handleBlur}
      onClick={model.openList}
      onChange={(event) => model.handleChange(event.target.value)}
      onKeyDown={model.handleKeyDown}
    />
  </span>
);

ComboboxTextInput.displayName = "ComboboxTextInput";

export { ComboboxTextInput };
