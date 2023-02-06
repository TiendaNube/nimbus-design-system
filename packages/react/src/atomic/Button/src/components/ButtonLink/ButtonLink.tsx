import React from "react";
import { button } from "@nimbus-ds/styles";

import { ButtonLinkProps } from "./buttonLink.types";

const ButtonLink: React.FC<ButtonLinkProps> = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  href,
  ...rest
}: ButtonLinkProps) => (
  <a href={href} className={button.classnames.appearance[appearance]} {...rest}>
    {rest.children}
  </a>
);

ButtonLink.displayName = "Button.Link";

export { ButtonLink };
