import React, { useMemo } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { list, listVars } from "@nimbus-ds/styles";

import { ListProps, ListComponents } from "./list.types";
import { ListSkeletonItem, ListSkeleton, ListItem } from "./components";

const List: React.FC<ListProps> & ListComponents = ({
  className: _className,
  style: _style,
  as: As = "ul",
  padding = "6",
  children,
  ...rest
}: ListProps) => {
  const resolvedPadding = useMemo(
    () => list.properties.padding[padding] ?? padding,
    [padding]
  );

  return (
    <As
      {...rest}
      className={list.classnames.container}
      style={assignInlineVars({
        [listVars.paddingInlineStart]: resolvedPadding,
      })}
    >
      {children}
    </As>
  );
};

List.Skeleton = ListSkeleton;
List.SkeletonItem = ListSkeletonItem;
List.Item = ListItem;

List.displayName = "List";
List.Item.displayName = "List.Item";
List.Skeleton.displayName = "List.Skeleton";
List.SkeletonItem.displayName = "List.SkeletonItem";

export { List };
