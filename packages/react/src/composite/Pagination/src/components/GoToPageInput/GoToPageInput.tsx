import React from "react";
import { Box } from "@nimbus-ds/box";
import { Input } from "@nimbus-ds/input";
import { pagination } from "@nimbus-ds/styles";

import { type GoToPageInputProps } from "./goToPageInput.types";

/**
 * Space taken by the input's border and horizontal padding, plus the
 * minimum width, so a single digit still reads as an input.
 */
const INPUT_CHROME = "1.125rem";
const INPUT_MIN_WIDTH = "2rem";

/**
 * Numeric input to jump straight to a page. It hugs what it displays: the
 * width follows the number of characters currently shown.
 */
const GoToPageInput: React.FC<GoToPageInputProps> = ({
  value,
  error,
  pageCount,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  "data-testid": dataTestId,
  "aria-describedby": ariaDescribedby,
}) => {
  const characters = Math.max(value.length, 1);

  return (
    <Box
      className={pagination.classnames.goToPage__input}
      width={`max(${INPUT_MIN_WIDTH}, calc(${characters}ch + ${INPUT_CHROME}))`}
    >
      <Input
        type="number"
        min={1}
        max={pageCount}
        value={value}
        appearance={error ? "danger" : "neutral"}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label="Go to page"
        aria-invalid={error ? true : undefined}
        aria-describedby={ariaDescribedby}
        data-testid={dataTestId}
      />
    </Box>
  );
};

GoToPageInput.displayName = "GoToPageInput";

export { GoToPageInput };
