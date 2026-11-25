import { type HTMLAttributes, type ReactNode } from "react";
import { type AvatarSkeleton } from "./components";

export interface AvatarComponents {
  Skeleton: typeof AvatarSkeleton;
}

/**
 * Size of the avatar. `small` (20px) fits inside a medium Button and next to a
 * line of text; `medium` (24px) identifies who a block of content belongs to;
 * `large` (40px) leads a header or a welcome screen. Only `small` and `medium`
 * fit inside a Button.
 */
export type AvatarSize = "small" | "medium" | "large";

/**
 * Color scheme of the avatar. `neutral` identifies a store or a person;
 * `ai` identifies an AI assistant.
 */
export type AvatarAppearance = "neutral" | "ai";

export interface AvatarProperties {
  /**
   * Content of the avatar: a single initial or an Icon.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Size of the avatar.
   * @default medium
   */
  size?: AvatarSize;
  /**
   * Color scheme of the avatar.
   * @default neutral
   */
  appearance?: AvatarAppearance;
  /**
   * Accessible name of the avatar. Without it the avatar is decorative and
   * hidden from assistive technologies, which is right when the name it
   * represents is visible next to it.
   */
  "aria-label"?: string;
  /**
   * Id of the element that names the avatar. Like `aria-label`, it exposes the
   * avatar as an image with that name.
   */
  "aria-labelledby"?: string;
}

/**
 * The avatar is not interactive, so it does not take `tabIndex`: a focusable
 * avatar would land the focus on an element hidden from assistive technologies.
 */
export type AvatarProps = AvatarProperties &
  Omit<
    HTMLAttributes<HTMLElement>,
    "children" | "aria-label" | "aria-labelledby" | "style" | "tabIndex"
  >;
