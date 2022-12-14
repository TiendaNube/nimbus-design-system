import React from "react";
import { badge } from "@nimbus-ds/styles";
import { Text } from "@nimbus-ds/text";

import { BadgeProps, BadgeComponents } from "./badge.types";
import { BadgeSkeleton } from "./components";

const Badge: React.FC<BadgeProps> & BadgeComponents = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  theme = "surface",
  count,
  ...rest
}: BadgeProps) => (
  <div {...rest} className={badge.classnames[theme][appearance]}>
    <Text color="currentColor">{count}</Text>
  </div>
);

Badge.Skeleton = BadgeSkeleton;
Badge.displayName = "Badge";

export { Badge };
