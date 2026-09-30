import { type ElementType, type HTMLAttributes } from "react";

export interface BreadcrumbItem {
  /**
   * Text of the level.
   */
  label: string;
  /**
   * Destination of the ancestor link. Required for every level except the last one.
   * It is ignored on the last item, which is always the current level.
   */
  href?: string;
  /**
   * Extra attributes forwarded to the rendered ancestor link (for example a router destination), used with `as`.
   * @TJS-type Record<string, unknown>
   */
  linkProps?: Record<string, unknown>;
}

export interface BreadcrumbProperties {
  /**
   * Levels from the top-most ancestor to the current level. The last item is always the current level.
   * @TJS-type BreadcrumbItem[]
   */
  items: BreadcrumbItem[];
  /**
   * Accessible name of the navigation region, supplied in the product language.
   */
  label: string;
  /**
   * Accessible name of the overflow trigger, supplied in the product language.
   */
  hiddenLevelsLabel: string;
  /**
   * Element or component used to render every ancestor link, visible and inside the hidden-levels panel.
   * It receives `href` and `linkProps` and must render an element that is a link.
   * @default a
   * @TJS-type React.ElementType
   */
  as?: ElementType;
}

export type BreadcrumbProps = BreadcrumbProperties &
  Omit<HTMLAttributes<HTMLElement>, "children" | "color">;
