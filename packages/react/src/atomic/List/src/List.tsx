import React from "react";
import { list } from "@nimbus-ds/styles";

import { ListProps, ListComponents } from "./list.types";
import { ListSkeletonItem, ListSkeleton, ListItem } from "./components";

const List: React.FC<ListProps> & ListComponents = ({
  className: _className,
  style: _style,
  as: As = "ul",
  children,
  ...rest
}: ListProps) => (
  <As {...rest} className={list.classnames.container}>
    {children}
  </As>
);

List.Skeleton = ListSkeleton;
List.SkeletonItem = ListSkeletonItem;
List.Item = ListItem;

List.displayName = "List";
List.Item.displayName = "List.Item";
List.Skeleton.displayName = "List.Skeleton";
List.SkeletonItem.displayName = "List.SkeletonItem";

export { List };
