import type { ElementType } from "react";

export interface BreadcrumbItem {
  /**
   * Text of the level. It wraps and is never truncated.
   */
  label: string;
  /**
   * Destination of the level. Ancestors without it render as plain text. It has no effect on the last level, which is always the current page.
   */
  href?: string;
}

export interface BreadcrumbProperties {
  /**
   * Levels of the path, from the root to the current page. They are rendered in the given order.
   * @TJS-type BreadcrumbItem[]
   */
  items: BreadcrumbItem[];
  /**
   * Maximum number of levels shown before the middle levels collapse into the hidden-levels panel. Integers below 3 behave as 3; non-integer or non-finite values behave as 4.
   * @default 4
   */
  maxVisible?: number;
  /**
   * Component used to render every ancestor link, visible and in the panel, such as a router link. It must render a native anchor with the received `href` and forward the received attributes.
   * @default "a"
   * @TJS-type React.ElementType
   */
  linkAs?: ElementType;
  /**
   * Accessible name of the navigation landmark.
   * @default "Breadcrumb"
   */
  ariaLabel?: string;
  /**
   * Accessible name of the hidden-levels trigger and of the panel it opens.
   * @default "Show hidden levels"
   */
  hiddenLevelsLabel?: string;
}

export type BreadcrumbProps = BreadcrumbProperties;
