import React, { useRef } from "react";
import { SearchIcon } from "@nimbus-ds/icons";
import { input } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";

import { InputIcon } from "../InputIcon";
import { InputSearchProps } from "./inputSearch.types";

const InputSearch: React.FC<InputSearchProps> = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
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
};

export { InputSearch };
