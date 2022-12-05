import React from "react";
import { input } from "@nimbus-ds/styles";

import { InputProps, InputComponents } from "./input.types";
import { Password, Search, Skeleton } from "./components";

const Input: React.FC<InputProps> & InputComponents = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  appendPosition = "start",
  append,
  ...rest
}: InputProps) => (
  <div className={input.style.container}>
    {append && (
      <div className={input.style.append[appendPosition]}>{append}</div>
    )}
    <input
      {...rest}
      className={[
        input.style.inputAppearance[appearance],
        append && input.style.inputAppend[appendPosition],
      ].join(" ")}
    />
  </div>
);

Input.Password = Password;
Input.Search = Search;
Input.Skeleton = Skeleton;

export { Input };
