import React from "react";
import { combobox } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";
import { Tag } from "@nimbus-ds/tag";
import { Text } from "@nimbus-ds/text";
import { CheckIcon, ChevronRightIcon, PlusCircleIcon } from "@nimbus-ds/icons";

import type { ComboboxLabels, ComboboxOption } from "../../combobox.types";
import type { ComboboxRowModel } from "../../hooks";
import {
  PATH_TEXT_SEPARATOR,
  buildRowName,
  fillLabel,
  joinPath
} from "../../utils";
import type { ComboboxRowProps } from "./ComboboxRow.types";

const CHEVRON_SIZE = 12;
const DISABLED_COLOR = "neutral-textDisabled";

const OptionPath: React.FC<{ ancestors: ComboboxOption[] }> = ({
  ancestors
}) => (
  <span className={combobox.classnames.rowPath} aria-hidden="true">
    {ancestors.map((ancestor, position) => (
      <React.Fragment key={ancestor.value}>
        {position > 0 && (
          <Icon
            source={<ChevronRightIcon size={CHEVRON_SIZE} />}
            color="neutral-textLow"
          />
        )}
        <Text
          as="span"
          fontSize="caption"
          lineHeight="caption"
          color="neutral-textLow"
        >
          {ancestor.label}
        </Text>
      </React.Fragment>
    ))}
  </span>
);

/**
 * Content of the create row.
 */
const CreateContent: React.FC<{ text: string; labels: ComboboxLabels }> = ({
  text,
  labels
}) => (
  <>
    <Text as="span" color="primary-interactive">
      {fillLabel(labels.create, { text })}
    </Text>
    <Icon source={<PlusCircleIcon />} color="primary-interactive" />
  </>
);

/**
 * Content of the title row of a level.
 */
const TitleContent: React.FC<{ option: ComboboxOption; selected: boolean }> = ({
  option,
  selected
}) => (
  <>
    <Text as="span" fontWeight="medium" color="neutral-textHigh">
      {option.label}
    </Text>
    {selected && <Icon source={<CheckIcon />} color="primary-interactive" />}
  </>
);

/**
 * Content of an option row.
 */
const OptionContent: React.FC<{
  row: Extract<ComboboxRowModel, { kind: "option" }>;
  twoLines: boolean;
}> = ({ row, twoLines }) => {
  const { option, ancestors, branch, selected, showPath } = row;
  const disabled = Boolean(option.disabled);
  const textColor = disabled ? DISABLED_COLOR : "neutral-textHigh";
  const lowColor = disabled ? DISABLED_COLOR : "neutral-textLow";
  return (
    <>
      {twoLines ? (
        <span className={combobox.classnames.rowBody}>
          <span className={combobox.classnames.rowLine}>
            <Text as="span" color={textColor}>
              {option.label}
            </Text>
            {option.tag && (
              <Tag appearance={option.tag.appearance}>{option.tag.label}</Tag>
            )}
          </span>
          {option.subtitle && (
            <Text
              as="span"
              fontSize="caption"
              lineHeight="caption"
              color={lowColor}
            >
              {option.subtitle}
            </Text>
          )}
          {showPath && <OptionPath ancestors={ancestors} />}
        </span>
      ) : (
        <Text as="span" color={textColor}>
          {option.label}
        </Text>
      )}
      <span className={combobox.classnames.rowEnd}>
        {selected && !option.subtitle && !option.tag && (
          <Icon
            source={<CheckIcon />}
            color={disabled ? DISABLED_COLOR : "primary-interactive"}
          />
        )}
        {branch && (
          <Icon source={<ChevronRightIcon />} color="neutral-textLow" />
        )}
      </span>
    </>
  );
};

/**
 * Accessible name of an option row, when its content alone is not enough.
 */
const getRowName = (
  row: ComboboxRowModel,
  labels: ComboboxLabels
): string | undefined => {
  if (row.kind !== "option") return undefined;
  const { option, ancestors, branch, showPath } = row;
  const twoLines = Boolean(option.subtitle || option.tag || showPath);
  if (!twoLines && !branch) return undefined;
  return buildRowName(option, {
    path: showPath ? joinPath(ancestors, PATH_TEXT_SEPARATOR) : "",
    branchHint: branch ? labels.branchHint : undefined
  });
};

/**
 * A row of the list: the create row, the title of a level or an option.
 */
const ComboboxRow: React.FC<ComboboxRowProps> = ({
  row,
  id,
  active,
  labels,
  onActivate
}) => {
  const option = row.kind === "create" ? undefined : row.option;
  const twoLines =
    row.kind === "option" &&
    Boolean(option?.subtitle || option?.tag || row.showPath);
  const className = [
    combobox.classnames.row,
    twoLines ? combobox.classnames.rowEnriched : null
  ]
    .filter(Boolean)
    .join(" ");

  return (
    // Rows are operated from the text input with the keys of its keyboard map
    // and exposed through `aria-activedescendant`, so they take no key events.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
    <div
      id={id}
      role="option"
      className={className}
      data-active={active ? "true" : undefined}
      aria-label={getRowName(row, labels)}
      aria-selected={row.kind === "create" ? false : row.selected}
      aria-disabled={option?.disabled || undefined}
      // Keeps the focus in the text input.
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => onActivate(row)}
    >
      {row.kind === "create" && (
        <CreateContent text={row.text} labels={labels} />
      )}
      {row.kind === "title" && (
        <TitleContent option={row.option} selected={row.selected} />
      )}
      {row.kind === "option" && <OptionContent row={row} twoLines={twoLines} />}
    </div>
  );
};

ComboboxRow.displayName = "ComboboxRow";

export { ComboboxRow };
