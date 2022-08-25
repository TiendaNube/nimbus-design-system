import React from "react";

import { tag } from "@nimbus-ds/styles";
import { TagProps, TagComponents } from "./tag.types";
import { Skeleton } from "./components";

const Tag: React.FC<TagProps> & TagComponents = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  children,
  ...rest
}: TagProps) => (
  <div {...rest} className={tag({ appearance })}>
    {children}
  </div>
);

Tag.Skeleton = Skeleton;

export { Tag };
