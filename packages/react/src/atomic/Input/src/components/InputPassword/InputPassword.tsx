import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@nimbus-ds/icons";
import { input } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";

import { InputPasswordProps } from "./inputPassword.types";

const InputPassword: React.FC<InputPasswordProps> = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  onChange,
  ...rest
}) => {
  const [value, setValue] = useState(rest.value || "");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow((prevState) => !prevState);

  return (
    <div className={input.classnames.container}>
      {value && (
        <button
          data-testid="button-password-show"
          type="button"
          className={[
            input.classnames.container__button,
            input.classnames.container__icon_append.end,
          ].join(" ")}
          onClick={handleShow}
        >
          <Icon
            color="primary-interactive"
            source={show ? <EyeOffIcon /> : <EyeIcon />}
          />
        </button>
      )}
      <input
        {...rest}
        className={[
          input.classnames.appearance[appearance],
          input.classnames.container__input_append.end,
        ].join(" ")}
        type={show ? "text" : "password"}
        value={value}
        onChange={(evt) => {
          if (onChange) {
            onChange(evt);
          }
          setValue(evt.target.value);
        }}
      />
    </div>
  );
};

export { InputPassword };
