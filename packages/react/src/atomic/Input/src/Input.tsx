import React from "react";
import { input } from "@nimbus-ds/styles";

import { InputProps, InputComponents } from "./input.types";
import { InputPassword, InputSearch, InputSkeleton } from "./components";

const Input: React.FC<InputProps> & InputComponents = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  appendPosition = "start",
  append,
  ...rest
}: InputProps) => (
  <div className={input.classnames.container}>
    {append && (
      <div className={input.classnames.append[appendPosition]}>{append}</div>
    )}
    <input
      {...rest}
      className={[
        input.classnames.inputAppearance[appearance],
        append && input.classnames.inputAppend[appendPosition],
      ].join(" ")}
    />
  </div>
);

Input.displayName = "Input";
Input.Password = InputPassword;
Input.Search = InputSearch;
Input.Skeleton = InputSkeleton;
Input.Password.displayName = "Input.Password";
Input.Search.displayName = "Input.Search";
Input.Skeleton.displayName = "Input.Skeleton";

export { Input };
