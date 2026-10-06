export const DEFAULT_VISIBLE = 4;

export const MIN_VISIBLE = 3;

export const DEFAULT_ARIA_LABEL = "Breadcrumb";

export const DEFAULT_HIDDEN_LEVELS_LABEL = "Show hidden levels";

/** Key of the trigger list item; stable so the trigger keeps its node across path changes. */
export const TRIGGER_KEY = "hidden-levels";

/** Delay before returning focus to the trigger after a press on a non-focusable outside area. */
export const FOCUS_RESTORE_DELAY = 0;

/** Space kept between the panel and the viewport edges. */
export const PANEL_VIEWPORT_PADDING = 8;

/** Distance between the trigger and the panel. */
export const PANEL_OFFSET = 4;

export const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "summary",
  "audio[controls]",
  "video[controls]",
  "[contenteditable]:not([contenteditable='false'])",
  "[tabindex]"
].join(",");
