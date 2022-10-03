import React from "react";
import { list } from "@nimbus-ds/styles";

import { ListProps, ListComponents } from "./list.types";
import { SkeletonItem, Skeleton, Item } from "./components";

const List: React.FC<ListProps> & ListComponents = ({
  className: _className,
  style: _style,
  as: As = "ul",
  children,
  ...rest
}: ListProps) => (
  <As {...rest} className={list.style.container}>
    {children}
  </As>
);

List.Skeleton = Skeleton;
List.SkeletonItem = SkeletonItem;
List.Item = Item;

List.displayName = "List";

export { List };
