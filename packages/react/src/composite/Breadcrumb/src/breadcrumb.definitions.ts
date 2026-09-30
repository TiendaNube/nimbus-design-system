import { type BreadcrumbItem } from "./breadcrumb.types";

export interface BreadcrumbMetrics {
  /** Available width of the container. */
  container: number;
  /** Full single-line width of every level, in input order. */
  levels: number[];
  /** Width of one separator. */
  separator: number;
  /** Width of the overflow trigger. */
  trigger: number;
}

/**
 * Selects the ancestors hidden behind the overflow trigger (B-006).
 * Returns the indexes of the hidden levels in hierarchy order; empty when everything fits.
 * Priority: current level, trigger, first level, then the nearest ancestors with no skipping.
 */
export const computeHiddenLevels = ({
  container,
  levels,
  separator,
  trigger
}: BreadcrumbMetrics): number[] => {
  const count = levels.length;
  if (count < 2) return [];

  const allWidth =
    levels.reduce((total, width) => total + width, 0) + separator * (count - 1);
  if (allWidth <= container) return [];

  const visible = new Set<number>([count - 1]);
  let width = trigger + separator + levels[count - 1];

  if (width + separator + levels[0] <= container) {
    visible.add(0);
    width += separator + levels[0];
  }

  for (let index = count - 2; index >= 1; index -= 1) {
    const next = width + separator + levels[index];
    if (next > container) break;
    visible.add(index);
    width = next;
  }

  return levels.map((_, index) => index).filter((index) => !visible.has(index));
};

/**
 * Stable identity of every level, used to follow a level across updates (B-015).
 */
export const getLevelKeys = (items: BreadcrumbItem[]): string[] => {
  const seen = new Map<string, number>();
  return items.map((item) => {
    const base = `${item.label}\u0000${item.href ?? ""}`;
    const occurrence = seen.get(base) ?? 0;
    seen.set(base, occurrence + 1);
    return `${base}\u0000${occurrence}`;
  });
};

export const FOCUSABLE_SELECTOR =
  'a[href],button,input,select,textarea,summary,[tabindex],[contenteditable="true"]';
