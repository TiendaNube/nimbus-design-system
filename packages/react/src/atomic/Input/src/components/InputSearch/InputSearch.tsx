import React, { forwardRef, useRef } from "react";
import { useRefObjectAsForwardedRef } from "@nimbus-ds/typings";
import { SearchIcon } from "@nimbus-ds/icons";
import { input } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";

import { InputIcon } from "../InputIcon";
import { InputSearchProps } from "./inputSearch.types";

const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
  (
    { className: _className, style: _style, appearance = "neutral", ...rest },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useRefObjectAsForwardedRef(ref, inputRef);

    const focusInput = () => inputRef.current?.focus();

    return (
      <div className={input.classnames.appearance[appearance]}>
        <InputIcon
          data-testid="icon-search"
          appendPosition="start"
          onClick={focusInput}
        >
          <Icon color="neutral-textDisabled" source={<SearchIcon />} />
        </InputIcon>
        <input
          {...rest}
          ref={inputRef}
          className={input.classnames.input}
          type="search"
        />
      </div>
    );
  }
);

export { InputSearch };
