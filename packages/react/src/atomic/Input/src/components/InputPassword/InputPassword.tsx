import type { ComponentPropsWithRef } from "react";
import React, { forwardRef, useRef, useState } from "react";
import { useRefObjectAsForwardedRef } from "@nimbus-ds/typings";
import { EyeIcon, EyeOffIcon } from "@nimbus-ds/icons";
import { input } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";

import { InputIcon } from "../InputIcon";
import type { InputPasswordBaseProps } from "./inputPassword.types";

const InputPassword = forwardRef<HTMLInputElement, InputPasswordBaseProps>(
  (
    {
      className: _className,
      style: _style,
      appearance = "neutral",
      aiGenerated = false,
      onChange,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useRefObjectAsForwardedRef(ref, inputRef);

    const [value, setValue] = useState(rest.value || "");
    const [show, setShow] = useState(false);
    const handleShow = () => setShow((prevState) => !prevState);
    const focusInput = () => inputRef.current?.focus();

    return (
      <div
        className={[
          input.classnames.appearance[appearance],
          aiGenerated && input.classnames.aiGenerated,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <input
          {...rest}
          ref={inputRef}
          className={input.classnames.input}
          value={value}
          type={show ? "text" : "password"}
          onChange={(evt) => {
            if (onChange) {
              onChange(evt);
            }
            setValue(evt.target.value);
          }}
        />
        {value && (
          <InputIcon
            data-testid="button-password-show"
            appendPosition="end"
            onClick={() => {
              focusInput();
              handleShow();
            }}
          >
            <Icon
              color="neutral-textDisabled"
              source={
                <Icon
                  color="primary-interactive"
                  source={show ? <EyeOffIcon /> : <EyeIcon />}
                />
              }
            />
          </InputIcon>
        )}
      </div>
    );
  }
);

export type InputPasswordProps = ComponentPropsWithRef<typeof InputPassword>;
export { InputPassword };
