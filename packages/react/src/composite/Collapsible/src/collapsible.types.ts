import { ReactNode, HTMLAttributes } from "react";
import { CollapsibleBody } from "./components/CollapsibleBody/CollapsibleBody";
import { CollapsibleItem } from "./components/CollapsibleItem/CollapsibleItem";

export interface CollapsibleComponents {
  Body: typeof CollapsibleBody;
  Item: typeof CollapsibleItem;
}

export interface CollapsibleProperties {
  children?: ReactNode;
  open?: boolean;
}

export type CollapsibleBaseProps = CollapsibleProperties &
  Omit<HTMLAttributes<HTMLElement>, "onChange">;
