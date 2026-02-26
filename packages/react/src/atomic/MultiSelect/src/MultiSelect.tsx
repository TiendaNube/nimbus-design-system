import React, { type ComponentPropsWithRef, useState, useEffect } from "react";
import { multiSelect } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";
import { Popover } from "@nimbus-ds/popover";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Chip } from "@nimbus-ds/chip";
import { ChevronDownIcon } from "@nimbus-ds/icons";

import {
  type MultiSelectComponents,
  type MultiSelectBaseProps,
  type MultiSelectOption,
} from "./multiSelect.types";
import { MultiSelectSkeleton } from "./components";

const MultiSelect: React.FC<MultiSelectBaseProps> & MultiSelectComponents = ({
  className,
  style: _style,
  options,
  appearance = "neutral",
  onChange,
  placeholder,
  value,
  zIndex,
  ...rest
}: MultiSelectBaseProps) => {
  const [selectedOptions, setSelectedOptions] = useState<MultiSelectOption[]>(
    []
  );

  const [availableOptions, setAvailableOptions] =
    useState<MultiSelectOption[]>(options);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prevState) => !prevState);

  const reset = (changedValue: MultiSelectOption[]) => {
    const available = options.flatMap((option) => {
      const findInChanged = changedValue.find(
        (item) => item.value === option.value
      );
      return findInChanged ? [] : option;
    });
    setAvailableOptions(available);
    setSelectedOptions(changedValue);
  };

  const handleSelectOption = (option: MultiSelectOption) => {
    setSelectedOptions([...selectedOptions, option]);
    setAvailableOptions(
      availableOptions.filter((item) => item.value !== option.value)
    );
    if (open) {
      handleOpen();
    }
  };

  const handleRemoveOption = (option: MultiSelectOption) => {
    setSelectedOptions(
      selectedOptions.filter((item) => item.value !== option.value)
    );
    setAvailableOptions([...availableOptions, option]);
  };

  useEffect(() => {
    if (value) {
      reset(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedOptions);
    }
  }, [selectedOptions, onChange]);

  return (
    <Popover
      content={
        <Box display="flex" flexDirection="column" width="100%">
          {availableOptions.map((availableOption) => (
            <button
              type="button"
              key={availableOption.value}
              className={multiSelect.classnames.container__button}
              onClick={() => handleSelectOption(availableOption)}
            >
              <Text color="currentColor">{availableOption.label}</Text>
            </button>
          ))}
        </Box>
      }
      enabledClick={!!availableOptions.length === false ? false : !open}
      matchReferenceWidth
      arrow={false}
      padding="none"
      overflow="hidden"
      offset={8}
      visible={open}
      onVisibility={handleOpen}
      zIndex={zIndex ?? "900"}
    >
      <div
        className={[className, multiSelect.classnames.appearance[appearance]]
          .filter(Boolean)
          .join(" ")}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        {...rest}
      >
        <div className={multiSelect.classnames.container__icon}>
          <Icon source={<ChevronDownIcon />} color="primary-textHigh" />
        </div>
        <Box display="flex" gap="1" flexWrap="wrap">
          {placeholder && !selectedOptions.length && (
            <Text color="neutral-textDisabled">{placeholder}</Text>
          )}
          {selectedOptions.map((selectedOption) => (
            <Chip
              key={selectedOption.value}
              data-testid={`option-selected-${selectedOption.value}`}
              text={selectedOption.label}
              onClick={() => handleRemoveOption(selectedOption)}
              removable
            />
          ))}
        </Box>
      </div>
    </Popover>
  );
};

MultiSelect.Skeleton = MultiSelectSkeleton;
MultiSelect.displayName = "MultiSelect";
MultiSelect.Skeleton.displayName = "MultiSelect.Skeleton";

export type MultiSelectProps = ComponentPropsWithRef<typeof MultiSelect>;
export { MultiSelect };
