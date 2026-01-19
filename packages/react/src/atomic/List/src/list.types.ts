import { HTMLAttributes, ReactNode } from "react";
import { list } from "@nimbus-ds/styles";
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
  /**
   * The padding of the list.
   * @default 6
   */
  padding?: keyof typeof list.properties.padding;
}

export type ListProps = ListProperties &
  HTMLAttributes<HTMLUListElement | HTMLOListElement>;
