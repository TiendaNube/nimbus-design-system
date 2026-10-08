import React from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Input } from "@nimbus-ds/input";
import { pagination } from "@nimbus-ds/styles";

import { type GoToPageInputProps } from "./goToPageInput.types";

/**
 * Input to jump straight to a page. It only accepts digits and hugs what it
 * displays: its width follows the number of characters currently shown.
 */
const GoToPageInput: React.FC<GoToPageInputProps> = ({ value, ...rest }) => (
  <div
    className={pagination.classnames.goToPage__input}
    style={assignInlineVars({
      [pagination.vars.goToPageChars]: String(Math.max(value.length, 1)),
    })}
  >
    <Input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="off"
      value={value}
      {...rest}
    />
  </div>
);

GoToPageInput.displayName = "GoToPageInput";

export { GoToPageInput };
