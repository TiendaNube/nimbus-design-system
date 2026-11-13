import React from "react";
import { combobox } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";
import { ChevronDownIcon, CloseIcon } from "@nimbus-ds/icons";

import type { ComboboxTrailingProps } from "./ComboboxTrailing.types";

/**
 * The trailing control of the field: a clear or clear-all button, or the
 * decorative chevron.
 */
const ComboboxTrailing: React.FC<ComboboxTrailingProps> = ({
  control,
  label,
  onClear
}) => {
  if (control === "chevron") {
    return (
      <span className={combobox.classnames.trailing} aria-hidden="true">
        <Icon source={<ChevronDownIcon />} color="neutral-textLow" />
      </span>
    );
  }
  return (
    <button
      type="button"
      className={[
        combobox.classnames.trailing,
        combobox.classnames.trailingButton
      ].join(" ")}
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();
        onClear();
      }}
    >
      <Icon source={<CloseIcon />} color="neutral-textLow" />
    </button>
  );
};

ComboboxTrailing.displayName = "ComboboxTrailing";

export { ComboboxTrailing };
