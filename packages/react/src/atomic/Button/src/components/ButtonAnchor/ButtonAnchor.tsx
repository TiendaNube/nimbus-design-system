import React from "react";
import { button } from "@nimbus-ds/styles";

import { ButtonAnchorProps } from "./buttonAnchor.types";

const ButtonAnchor: React.FC<ButtonAnchorProps> = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  href,
  ...rest
}: ButtonAnchorProps) => (
  <a href={href} className={button.classnames.appearance[appearance]} {...rest}>
    {rest.children}
  </a>
);

ButtonAnchor.displayName = "Button.Anchor";

export { ButtonAnchor };
