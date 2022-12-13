import React from "react";
import { tag } from "@nimbus-ds/styles";

import { TagProps, TagComponents } from "./tag.types";
import { TagSkeleton } from "./components";

const Tag: React.FC<TagProps> & TagComponents = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  children,
  ...rest
}: TagProps) => (
  <div {...rest} className={tag.style({ appearance })}>
    {children}
  </div>
);

Tag.Skeleton = TagSkeleton;
Tag.Skeleton.displayName = "Tag.Skeleton";

export { Tag };
