import React, { useRef } from "react";
import { input } from "@nimbus-ds/styles";

import { InputProps, InputComponents } from "./input.types";
import {
  InputPassword,
  InputSearch,
  InputSkeleton,
  InputIcon,
} from "./components";

const Input: React.FC<InputProps> & InputComponents = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  appendPosition = "start",
  append,
  ...rest
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => inputRef.current?.focus();
  const dataTestid = rest?.["data-testid"];

  return (
    <div
      data-testid={dataTestid ? `${dataTestid}-container` : ""}
      className={input.classnames.appearance[appearance]}
    >
      {append && appendPosition === "start" && (
        <InputIcon
          data-testid={dataTestid ? `${dataTestid}-icon` : ""}
          appendPosition={appendPosition}
          onClick={focusInput}
        >
          {append}
        </InputIcon>
      )}
      <input {...rest} ref={inputRef} className={input.classnames.input} />
      {append && appendPosition === "end" && (
        <InputIcon
          data-testid={dataTestid ? `${dataTestid}-icon` : ""}
          appendPosition={appendPosition}
          onClick={focusInput}
        >
          {append}
        </InputIcon>
      )}
    </div>
  );
};

Input.Password = InputPassword;
Input.Search = InputSearch;
Input.Skeleton = InputSkeleton;
Input.displayName = "Input";
Input.Password.displayName = "Input.Password";
Input.Search.displayName = "Input.Search";
Input.Skeleton.displayName = "Input.Skeleton";

export { Input };
