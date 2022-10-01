import { HTMLAttributes, ReactNode } from "react";
import { SkeletonItem, Skeleton, Item } from "./components";

export interface ListComponents {
  Skeleton: typeof Skeleton;
  SkeletonItem: typeof SkeletonItem;
  Item: typeof Item;
}

export interface ListProps
  extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  /** Element to be rendered inside the List component */
  children: ReactNode;
  /** Determines the type of html list that will be rendered */
  as?: "ul" | "ol";
}
