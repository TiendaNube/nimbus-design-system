import React from "react";
import { link } from "@nimbus-ds/styles";

import { LinkProps, LinkComponents } from "./link.types";
import { Skeleton } from "./components";

const Link: React.FC<LinkProps> & LinkComponents = ({
  className: _className,
  style: _style,
  as = "link",
  appearance = "neutral",
  textDecoration = "underline",
  size = "base",
  children,
  ...rest
}: LinkProps) => (
  <a {...rest} className={link.style({ appearance, as, textDecoration, size })}>
    {children}
  </a>
);

Link.Skeleton = Skeleton;
Link.displayName = "Link";

export { Link };
