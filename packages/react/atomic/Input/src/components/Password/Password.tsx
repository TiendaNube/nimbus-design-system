import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@tiendanube/icons";
import { input } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";

import { PasswordProps } from "./password.types";

const Password: React.FC<PasswordProps> = ({
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
    <div className={input.style.container}>
      {value && (
        <button
          data-testid="button-password-show"
          type="button"
          className={[input.style.password, input.style.append.end].join(" ")}
          onClick={handleShow}
        >
          <Icon
            color="primary.interactive"
            source={show ? <EyeOffIcon /> : <EyeIcon />}
          />
        </button>
      )}
      <input
        {...rest}
        className={[
          input.style.inputAppearance[appearance],
          input.style.inputAppend.end,
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

Password.displayName = "Input.Password";

export { Password };
