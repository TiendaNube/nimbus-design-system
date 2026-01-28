import { type ReactNode, type HTMLAttributes } from "react";
import { type TagSkeleton } from "./components";

export interface TagComponents {
  Skeleton: typeof TagSkeleton;
}

export interface TagProperties {
  /**
   * The content of the tag.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Change the visual style of the tag.
   * @default neutral
   */
  appearance?:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "neutral"
    | "ai-generative";
}

export type TagProps = TagProperties & HTMLAttributes<HTMLDivElement>;
