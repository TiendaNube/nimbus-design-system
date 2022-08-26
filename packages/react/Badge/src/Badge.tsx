import React from "react";

import { badge } from "@nimbus-ds/styles";
import { BadgeProps, BadgeComponents } from "./badge.types";
import { Skeleton } from "./components";

const Badge: React.FC<BadgeProps> & BadgeComponents = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  count,
  ...rest
}: BadgeProps) => (
  <div {...rest} className={badge({ appearance })}>
    {count}
  </div>
);

Badge.Skeleton = Skeleton;

export { Badge };
