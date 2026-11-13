import React from "react";
import { Chip } from "@nimbus-ds/chip";

import {
  PATH_TEXT_SEPARATOR,
  fillLabel,
  getChipTexts,
  getPath,
  joinPath
} from "../../utils";
import type { ComboboxChipsProps } from "./ComboboxChips.types";

/**
 * One removable chip per selected option. A chip shows its label, or its full
 * path when another chip has the same label, and exposes its full path as its
 * accessible description.
 */
const ComboboxChips: React.FC<ComboboxChipsProps> = ({
  selection,
  index,
  baseId,
  disabled,
  labels,
  onRemove
}) => {
  const texts = getChipTexts(selection, index);
  return (
    <>
      {selection.map((option, position) => {
        const descriptionId = `${baseId}-chip-${position}`;
        return (
          <React.Fragment key={option.value}>
            <Chip
              text={texts[position]}
              removable={!disabled}
              removeLabel={fillLabel(labels.removeChip, { name: option.label })}
              aria-describedby={descriptionId}
              onClick={(event) => {
                event.stopPropagation();
                onRemove(option);
              }}
            />
            <span id={descriptionId} hidden>
              {joinPath(getPath(option, index), PATH_TEXT_SEPARATOR)}
            </span>
          </React.Fragment>
        );
      })}
    </>
  );
};

ComboboxChips.displayName = "ComboboxChips";

export { ComboboxChips };
