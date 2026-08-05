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

// Module-level counter used to derive a stable, unique id per Input
// instance. Avoids React's useId() (React 18+ only, and this package's
// peerDependencies support React 16.8+) and avoids Math.random() (flagged
// by SonarCloud as a PRNG-in-security-context, even though this id is only
// ever used to wire up aria-describedby, not for anything security-related).
let idCounter = 0;

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
    if (generatedIdRef.current === null) {
      idCounter += 1;
      generatedIdRef.current = `nimbus-input-${idCounter}`;
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
