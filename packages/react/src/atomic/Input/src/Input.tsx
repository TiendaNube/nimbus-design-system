import React, {
  type ComponentPropsWithRef,
  type ForwardRefExoticComponent,
  forwardRef,
  useRef,
} from "react";
import { useRefObjectAsForwardedRef } from "@nimbus-ds/typings";
import { input } from "@nimbus-ds/styles";

import { type InputBaseProps, type InputComponents } from "./input.types";
import {
  InputPassword,
  InputSearch,
  InputSkeleton,
  InputIcon,
  InputText,
} from "./components";

const Input = forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      className,
      style: _style,
      appearance = "neutral",
      aiGenerated = false,
      appendPosition = "start",
      append,
      prefix,
      suffix,
      "aria-describedby": ariaDescribedby,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useRefObjectAsForwardedRef(ref, inputRef);

    const focusInput = () => inputRef.current?.focus();
    const dataTestid = rest?.["data-testid"];

    const hasPrefix = prefix !== null && prefix !== undefined;
    const hasSuffix = suffix !== null && suffix !== undefined;

    const generatedIdRef = useRef<string | null>(null);
    if (!generatedIdRef.current) {
      generatedIdRef.current = `nimbus-input-${Math.random()
        .toString(36)
        .slice(2, 9)}`;
    }
    const idBase = dataTestid || generatedIdRef.current;
    const prefixId = `${idBase}-prefix`;
    const suffixId = `${idBase}-suffix`;

    const describedByIds = [
      hasPrefix ? prefixId : null,
      ariaDescribedby || null,
      hasSuffix ? suffixId : null,
    ].filter(Boolean);
    const inputAriaDescribedby = describedByIds.length
      ? describedByIds.join(" ")
      : undefined;

    return (
      <div
        data-testid={dataTestid ? `${dataTestid}-container` : ""}
        className={[
          className,
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
        {hasPrefix && (
          <InputText
            id={prefixId}
            data-testid={dataTestid ? `${dataTestid}-prefix` : ""}
            appendPosition="start"
          >
            {prefix}
          </InputText>
        )}
        <input
          {...rest}
          ref={inputRef}
          className={input.classnames.input}
          aria-describedby={inputAriaDescribedby}
        />
        {hasSuffix && (
          <InputText
            id={suffixId}
            data-testid={dataTestid ? `${dataTestid}-suffix` : ""}
            appendPosition="end"
          >
            {suffix}
          </InputText>
        )}
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
  InputBaseProps & React.RefAttributes<HTMLInputElement>
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
