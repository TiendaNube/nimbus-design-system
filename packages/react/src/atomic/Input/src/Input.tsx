import type { ComponentPropsWithRef, ForwardRefExoticComponent } from "react";
import React, { forwardRef, useRef } from "react";
import { useRefObjectAsForwardedRef } from "@nimbus-ds/typings";
import { input } from "@nimbus-ds/styles";

import type { InputBaseProps, InputComponents } from "./input.types";
import {
  InputPassword,
  InputSearch,
  InputSkeleton,
  InputIcon,
} from "./components";

const Input = forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      className: _className,
      style: _style,
      appearance = "neutral",
      aiGenerated = false,
      appendPosition = "start",
      append,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useRefObjectAsForwardedRef(ref, inputRef);

    const focusInput = () => inputRef.current?.focus();
    const dataTestid = rest?.["data-testid"];

    return (
      <div
        data-testid={dataTestid ? `${dataTestid}-container` : ""}
        className={[
          aiGenerated && input.classnames.aiGenerated,
          input.classnames.appearance[appearance],
        ]
          .filter(Boolean)
          .join(" ")}
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
  }
) as ForwardRefExoticComponent<
  InputBaseProps &
    React.InputHTMLAttributes<HTMLInputElement> &
    React.RefAttributes<HTMLInputElement>
> &
  InputComponents;

Input.Password = InputPassword;
Input.Search = InputSearch;
Input.Skeleton = InputSkeleton;
Input.displayName = "Input";
Input.Password.displayName = "Input.Password";
Input.Search.displayName = "Input.Search";
Input.Skeleton.displayName = "Input.Skeleton";

export type InputProps = ComponentPropsWithRef<typeof Input>;
export { Input };
