/**
 * Known prop / native-HTML-attribute collisions — the ratchet baseline for
 * `yarn types:collisions` (`.scripts/check-native-attr-collisions.ts`).
 *
 * EVERY ENTRY BELOW IS A REAL BUG that is published today. The component declares
 * its own prop, the props type intersects a React native-attributes type that already
 * declares a key of the same name, and the resulting intersection cannot be satisfied
 * by any value of the component's own declared type. They are listed here — not fixed —
 * only because fixing published component source requires its own release (the component
 * package plus `@nimbus-ds/components`, see `.cursor/rules/versioning.mdc`), which is a
 * separate PR from adding this check.
 *
 * How to use this file:
 *
 * - NEVER add an entry. A new collision means the props type you just wrote is broken:
 *   `Omit` the colliding key from the native side (`ComponentProperties &
 *   Omit<HTMLAttributes<T>, keyof ComponentProperties>`) or rename your prop. Silencing
 *   it here ships the bug to consumers, and their typecheck is where it surfaces.
 * - ONLY remove entries, by fixing the collision. The checker fails when a baselined
 *   entry no longer collides and tells you to delete the line — a baseline that still
 *   lists fixed bugs stops being a ratchet.
 *
 * Entries are matched on `file` + `declaration` + `key`, never on line number, so
 * unrelated edits above a declaration do not invalidate the baseline.
 */

export interface BaselineEntry {
  /** Repo-relative path of the file declaring the props type. */
  file: string;
  /** Name of the props type or interface. */
  declaration: string;
  /** The colliding prop name. */
  key: string;
  /** One line on what the collision breaks. */
  reason: string;
}

export const knownCollisions: readonly BaselineEntry[] = [
  {
    file: "packages/react/src/atomic/Text/src/text.types.ts",
    declaration: "TextProps",
    key: "color",
    reason:
      "TextSprinkle.color allows the responsive object form; React's HTMLAttributes declares the non-standard color?: string, so the responsive form cannot be passed.",
  },
  {
    file: "packages/react/src/atomic/Title/src/title.types.ts",
    declaration: "TitleProps",
    key: "color",
    reason:
      "Same as TextProps: the responsive color object is unusable against React's color?: string. Box already guards this with Omit<HTMLAttributes<HTMLElement>, 'color'>.",
  },
  {
    file: "packages/react/src/atomic/Popover/src/popover.types.ts",
    declaration: "PopoverProps",
    key: "color",
    reason:
      "The Omit list is hand-written ('children' | 'content') and misses 'color', so the responsive color object is unusable.",
  },
  {
    file: "packages/react/src/atomic/FileUploader/src/fileUploader.types.ts",
    declaration: "FileUploaderProps",
    key: "onError",
    reason:
      "Own onError?: (error: Error) => void intersects React's ReactEventHandler<HTMLInputElement>; the documented handler signature cannot be passed. Note onDrop on the same type collides too and is fine — only assignability separates them.",
  },
  {
    file: "packages/react/src/atomic/MultiSelect/src/multiSelect.types.ts",
    declaration: "MultiSelectBaseProps",
    key: "onChange",
    reason:
      "The Omit list is hand-written ('children' | 'value') and misses 'onChange', so the component's own (values: MultiSelectOption[]) => void handler cannot be passed.",
  },
];
