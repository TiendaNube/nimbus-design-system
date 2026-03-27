import React from "react";
import { badge } from "@nimbus-ds/styles";
import { Text } from "@nimbus-ds/text";

import { type BadgeProps, type BadgeComponents } from "./badge.types";
import { BadgeSkeleton } from "./components";

const Badge: React.FC<BadgeProps> & BadgeComponents = ({
  className,
  style: _style,
  appearance = "neutral",
  theme = "surface",
  type = "count",
  count,
  ...rest
}: BadgeProps) => {
  if (type === "dot") {
    return (
      <div
        {...rest}
        className={[className, badge.classnames.dot[appearance]]
          .filter(Boolean)
          .join(" ")}
      />
    );
  }

  return (
    <div
      {...rest}
      className={[className, badge.classnames[theme][appearance]]
        .filter(Boolean)
        .join(" ")}
    >
      <Text fontSize="caption" lineHeight="caption" color="currentColor">
        {count}
      </Text>
    </div>
  );
};

Badge.Skeleton = BadgeSkeleton;
Badge.displayName = "Badge";
Badge.Skeleton.displayName = "Badge.Skeleton";

export { Badge };
