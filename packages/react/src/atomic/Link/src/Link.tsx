import React from "react";
import { link } from "@nimbus-ds/styles";

import { LinkProps, LinkComponents } from "./link.types";
import { LinkSkeleton, LinkButton } from "./components";

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
      link.classnames.appearance[appearance],
      link.classnames.size[size],
      link.sprinkle({ textDecoration }),
    ].join(" ")}
  >
    {children}
  </a>
);

Link.Skeleton = LinkSkeleton;
Link.Button = LinkButton;
Link.displayName = "Link";
Link.Skeleton.displayName = "Link.Skeleton";

export { Link };
