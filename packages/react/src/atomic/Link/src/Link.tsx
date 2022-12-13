import React from "react";
import { link } from "@nimbus-ds/styles";

import { LinkProps, LinkComponents } from "./link.types";
import { LinkSkeleton } from "./components";

const Link: React.FC<LinkProps> & LinkComponents = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  textDecoration = "underline",
  size = "base",
  children,
  ...rest
}: LinkProps) => (
  <a
    {...rest}
    className={[
      link.style.appearance[appearance],
      link.style.size[size],
      link.style.textDecoration[textDecoration],
    ].join(" ")}
  >
    {children}
  </a>
);

Link.Skeleton = LinkSkeleton;
Link.displayName = "Link";

export { Link };
