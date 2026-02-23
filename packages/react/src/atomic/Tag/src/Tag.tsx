import React from "react";
import { tag } from "@nimbus-ds/styles";

import { type TagProps, type TagComponents } from "./tag.types";
import { TagSkeleton } from "./components";

const Tag: React.FC<TagProps> & TagComponents = ({
  className,
  style: _style,
  appearance = "neutral",
  children,
  ...rest
}: TagProps) => (
  <div
    {...rest}
    className={[className, tag.classnames.appearance[appearance]]
      .filter(Boolean)
      .join(" ")}
  >
    {children}
  </div>
);

Tag.Skeleton = TagSkeleton;
Tag.displayName = "Tag";
Tag.Skeleton.displayName = "Tag.Skeleton";

export { Tag };
