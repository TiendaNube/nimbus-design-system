import { type BreadcrumbItem } from "../../breadcrumb.types";
import { DEFAULT_VISIBLE, MIN_VISIBLE } from "../../breadcrumb.definitions";

export type CollapsedPathEntry = BreadcrumbItem | "trigger";

export interface CollapsedPath {
  /** Entries of the visible path, with `"trigger"` at the position of the hidden-levels trigger. */
  visible: CollapsedPathEntry[];
  /** Levels listed in the hidden-levels panel, in path order. */
  hidden: BreadcrumbItem[];
}

/**
 * Normalizes the level limit: integers below the minimum behave as the minimum, and non-integer or non-finite values behave as the default.
 */
export const getVisibleLimit = (maxVisible?: number): number =>
  Number.isInteger(maxVisible)
    ? Math.max(MIN_VISIBLE, maxVisible as number)
    : DEFAULT_VISIBLE;

/**
 * Splits the levels into the visible path and the hidden set. Above the limit, the path keeps the root, the trigger, the parent and the current level.
 */
export const getCollapsedPath = (
  items: BreadcrumbItem[],
  limit: number
): CollapsedPath => {
  const count = items.length;
  if (count <= limit) return { visible: items, hidden: [] };

  return {
    visible: [items[0], "trigger", items[count - 2], items[count - 1]],
    hidden: items.slice(1, count - 2)
  };
};
