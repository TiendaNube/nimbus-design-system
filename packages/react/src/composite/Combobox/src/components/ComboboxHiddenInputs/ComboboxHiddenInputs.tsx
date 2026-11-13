import React from "react";

import type { ComboboxHiddenInputsProps } from "./ComboboxHiddenInputs.types";

/**
 * The values of the field for a native form: one hidden field per selected
 * value, or one empty field when a single field has no value.
 */
const ComboboxHiddenInputs: React.FC<ComboboxHiddenInputsProps> = ({
  name,
  selection,
  multiple
}) => {
  if (!name) return null;
  if (!multiple && selection.length === 0) {
    return <input type="hidden" name={name} value="" />;
  }
  return (
    <>
      {selection.map((option) => (
        <input
          key={option.value}
          type="hidden"
          name={name}
          value={option.value}
        />
      ))}
    </>
  );
};

ComboboxHiddenInputs.displayName = "ComboboxHiddenInputs";

export { ComboboxHiddenInputs };
