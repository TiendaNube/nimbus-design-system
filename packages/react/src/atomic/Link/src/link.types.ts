import { ReactNode, AnchorHTMLAttributes } from "react";
import { link } from "@nimbus-ds/styles";
import { LinkSkeleton, LinkButton } from "./components";

export interface LinkComponents {
  Skeleton: typeof LinkSkeleton;
  Button: typeof LinkButton;
}

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Text to be displayed on link */
  children: ReactNode;
  /** Link appearance */
  appearance?: "primary" | "danger" | "neutral" | "neutral.background";
  /** Decoration for the link text */
  textDecoration?: typeof link.properties.textDecoration[number];
  /** Size of the link text */
  size?: "caption" | "base" | "highlight";
}
