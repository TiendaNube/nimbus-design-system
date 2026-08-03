import React from "react";
import { input } from "@nimbus-ds/styles";

import { type InputTextProps } from "./inputText.types";

/**
 * Renders static, non-interactive text (e.g. a currency symbol or unit of
 * measure) inside the Input container, used to implement the `prefix` and
 * `suffix` props. Unlike `InputIcon`, it renders a plain `<span>` instead of
 * a `<button>`, since this content is not meant to be focusable or
 * clickable.
 */
const InputText: React.FC<InputTextProps> = ({
  className,
  style: _style,
  appendPosition,
  children,
  ...rest
}) => (
  <span
    data-input-part="text"
    data-append-position={appendPosition}
    className={[
      className,
      input.classnames.container__text,
      input.classnames.container__text_append[appendPosition],
    ]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  >
    {children}
  </span>
);

export { InputText };
