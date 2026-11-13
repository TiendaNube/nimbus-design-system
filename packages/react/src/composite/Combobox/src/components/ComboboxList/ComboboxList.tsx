import React from "react";
import { combobox } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";
import { Text } from "@nimbus-ds/text";
import { ArrowLeftIcon } from "@nimbus-ds/icons";

import type { ComboboxRowModel } from "../../hooks";
import { ComboboxRow } from "../ComboboxRow";
import type { ComboboxListProps } from "./ComboboxList.types";

const isEnrichedRow = (row: ComboboxRowModel | undefined): boolean =>
  row?.kind === "option" &&
  Boolean(row.option.subtitle || row.option.tag || row.showPath);

/**
 * The list of the Combobox: back control, level title, rows and "No results".
 */
const ComboboxList: React.FC<ComboboxListProps> = ({
  model,
  labels,
  multiple,
  listboxId,
  listRef
}) => {
  const { rows, backLabel, hierarchical } = model;
  const first = rows[0];
  // A title that does not select its branch is plain text, not an option.
  const plainTitle =
    first?.kind === "title" && !first.selectable ? first.option : null;
  const optionRows = plainTitle ? rows.slice(1) : rows;

  const listClassName = [
    combobox.classnames.list,
    hierarchical ? combobox.classnames.listHierarchical : null
  ]
    .filter(Boolean)
    .join(" ");

  return (
    // The list only keeps the focus in the text input when it is pressed.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={listRef}
      className={listClassName}
      onMouseDown={(event) => event.preventDefault()}
    >
      <span className={combobox.classnames.visuallyHidden} role="status">
        {`${labels.results}: ${model.resultCount}`}
      </span>
      {backLabel && (
        <>
          <button
            type="button"
            tabIndex={-1}
            className={combobox.classnames.backControl}
            onClick={model.goBack}
          >
            <Icon source={<ArrowLeftIcon />} color="neutral-textLow" />
            <Text as="span" color="neutral-textHigh">
              {backLabel}
            </Text>
          </button>
          <div className={combobox.classnames.divider} aria-hidden="true" />
        </>
      )}
      {plainTitle && (
        <>
          <div className={combobox.classnames.titlePlain} aria-hidden="true">
            <Text as="span" fontWeight="medium" color="neutral-textHigh">
              {plainTitle.label}
            </Text>
          </div>
          <div className={combobox.classnames.divider} aria-hidden="true" />
        </>
      )}
      {optionRows.length === 0 ? (
        <div className={combobox.classnames.status}>
          <Text as="span" color="neutral-textLow">
            {labels.noResults}
          </Text>
        </div>
      ) : (
        <div
          id={listboxId}
          role="listbox"
          aria-multiselectable={multiple || undefined}
          className={combobox.classnames.group}
        >
          <div
            role="group"
            aria-label={model.groupLabel}
            className={combobox.classnames.group}
          >
            {optionRows.map((row, position) => (
              <React.Fragment key={row.key}>
                {position > 0 &&
                  (row.kind === "title" ||
                    optionRows[position - 1].kind === "title" ||
                    isEnrichedRow(row) ||
                    isEnrichedRow(optionRows[position - 1])) && (
                    <div
                      className={combobox.classnames.divider}
                      aria-hidden="true"
                    />
                  )}
                <ComboboxRow
                  row={row}
                  id={model.getRowId(rows.indexOf(row))}
                  active={model.isActive(row)}
                  labels={labels}
                  onActivate={model.activateRow}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

ComboboxList.displayName = "ComboboxList";

export { ComboboxList };
