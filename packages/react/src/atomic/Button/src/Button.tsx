import React from "react";
import { button } from "@nimbus-ds/styles";

import { ButtonProps, ButtonComponents } from "./button.types";
import { ButtonSkeleton, ButtonAnchor } from "./components";

const Button: React.FC<ButtonProps> & ButtonComponents = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  children,
  ...rest
}: ButtonProps) => (
  <button
    type="button"
    {...rest}
    className={button.classnames.appearance[appearance]}
  >
    {children}
  </button>
);

Button.Skeleton = ButtonSkeleton;
Button.Anchor = ButtonAnchor;
Button.displayName = "Button";
Button.Skeleton.displayName = "Button.Skeleton";

export { Button };
