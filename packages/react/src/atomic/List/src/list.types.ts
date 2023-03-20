import { HTMLAttributes, ReactNode } from "react";
import { ListSkeletonItem, ListSkeleton, ListItem } from "./components";

export interface ListComponents {
  Skeleton: typeof ListSkeleton;
  SkeletonItem: typeof ListSkeletonItem;
  Item: typeof ListItem;
}

export interface ListProperties {
  /**
   * The content of the list.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Determines the type of html list that will be rendered
   * @default ul
   */
  as?: "ul" | "ol";
}

export type ListProps = ListProperties &
  HTMLAttributes<HTMLUListElement | HTMLOListElement>;
