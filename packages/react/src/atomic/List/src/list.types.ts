import { HTMLAttributes, ReactNode } from "react";
import { ListSkeletonItem, ListSkeleton, ListItem } from "./components";

export interface ListComponents {
  Skeleton: typeof ListSkeleton;
  SkeletonItem: typeof ListSkeletonItem;
  Item: typeof ListItem;
}

export interface ListProps
  extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  /** Element to be rendered inside the List component */
  children: ReactNode;
  /** Determines the type of html list that will be rendered */
  as?: "ul" | "ol";
}
