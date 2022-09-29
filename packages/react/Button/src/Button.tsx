import React from "react";
import { button } from "@nimbus-ds/styles";

import { ButtonProps, ButtonComponents } from "./button.types";
import { Skeleton } from "./components";

const Button: React.FC<ButtonProps> & ButtonComponents = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  children,
  ...rest
}: ButtonProps) => (
  <button type="button" {...rest} className={button.style[appearance]}>
    {children}
  </button>
);

Button.Skeleton = Skeleton;
Button.displayName = "Button";

export { Button };
