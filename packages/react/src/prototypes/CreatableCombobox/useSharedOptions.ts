import { useCallback, useEffect, useState } from "react";

/**
 * MOCKED, DISPOSABLE PERSISTENCE — read this before reusing any of this file.
 *
 * There is no real backend behind this prototype. Issue #508 asks for options
 * that are shared across usages (not local to one form) and that a
 * newly-created option keeps existing for other, later uses. To make that
 * learnable without a server, this module simulates a shared option store
 * with `window.localStorage` plus a same-tab `CustomEvent` so every mounted
 * `CreatableCombobox` on the page reacts immediately when one instance
 * creates an option.
 *
 * What this DOES demonstrate:
 * - Two Combobox instances rendered at once (see the "Two independent
 *   fields" story) both see an option created in the other, live.
 * - Reloading the Storybook preview keeps whatever was created, because
 *   `localStorage` outlives the page.
 *
 * What this does NOT demonstrate, and a real implementation would need:
 * - Sharing across different browsers, devices or people — localStorage is
 *   scoped to one browser origin, on one machine.
 * - Server validation, deduplication races, permissions, or error handling
 *   for a failed create call.
 */

/** Appearances of Nimbus `Tag`, so a row's tag can use the same palette. */
export type ComboboxOptionTagAppearance =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "ai-generative";

/**
 * The status-like tag an enriched option shows at the right of its title
 * (Figma node 149:11359). Rendered with Nimbus `Tag`.
 */
export interface ComboboxOptionTag {
  label: string;
  /** @default "neutral" */
  appearance?: ComboboxOptionTagAppearance;
}

export interface ComboboxOption {
  value: string;
  label: string;
  /**
   * Optional secondary line under the title (`label`) in the dropdown row —
   * the "enriched option" of Figma node 149:11359. Display-only: filtering
   * stays label-only. Plain options (no `subtitle` and no `tag`) render
   * exactly as before.
   */
  subtitle?: string;
  /** Optional tag shown at the right of the title in the dropdown row, and
   *  next to a selected single-select value inside the field. */
  tag?: ComboboxOptionTag;
  /**
   * Independent of selection: an option a client marks as unpickable for
   * its own reason (e.g. "blocked by business rule X"), not because it's
   * already chosen. Never set by this mocked store itself — `createOption`
   * always returns a plain enabled option — only seed data below turns it
   * on, so a client of this component would set it from its own data.
   * @default false
   */
  disabled?: boolean;
}

const STORAGE_KEY = "nimbus-prototype:creatable-combobox:options";
const CHANGE_EVENT = "nimbus-prototype:creatable-combobox:options-changed";

// Obviously-fake sample data — generic product tags, nothing customer- or
// business-specific. "Limited edition" is seeded `disabled: true` purely to
// keep the business-rule-disabled state demonstrable in the stories — pick
// any other option to see the normal flow.
const SEED_OPTIONS: ComboboxOption[] = [
  { value: "eco-friendly", label: "Eco-friendly" },
  { value: "handmade", label: "Handmade" },
  { value: "limited-edition", label: "Limited edition", disabled: true },
  { value: "vegan", label: "Vegan" },
  { value: "waterproof", label: "Waterproof" },
];

/**
 * Obviously-fake sample data for the "enriched options" variant (title +
 * subtitle + tag), used by the enriched demo fields and the Playground's
 * `enriched` control. Kept out of the shared store on purpose: enriched
 * fields take this fixed list through the `options` prop, so Fields A-D
 * are unaffected. No real people or document numbers.
 */
export const ENRICHED_OPTIONS: ComboboxOption[] = [
  {
    value: "customer-alpha",
    label: "Customer Alpha",
    subtitle: "ID 000.000.001",
    tag: { label: "Active", appearance: "success" },
  },
  {
    value: "customer-bravo",
    label: "Customer Bravo",
    subtitle: "ID 000.000.002",
    tag: { label: "Paused", appearance: "neutral" },
  },
  {
    value: "customer-charlie",
    label: "Customer Charlie",
    subtitle: "ID 000.000.003",
    tag: { label: "Pending", appearance: "warning" },
  },
  {
    value: "customer-delta",
    label: "Customer Delta",
    subtitle: "ID 000.000.004",
    tag: { label: "Blocked", appearance: "danger" },
    disabled: true,
  },
  {
    value: "customer-echo",
    label: "Customer Echo",
    subtitle: "ID 000.000.005",
  },
  {
    value: "customer-foxtrot",
    label: "Customer Foxtrot",
    tag: { label: "New", appearance: "primary" },
  },
];

export const slugify = (label: string): string =>
  label
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const readStore = (): ComboboxOption[] => {
  if (typeof window === "undefined") return SEED_OPTIONS;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_OPTIONS;

    const parsed = JSON.parse(raw);
    // A present-but-empty array falls back to the seed list too: nothing in
    // this prototype ever legitimately empties the store, so an empty array
    // only means a stale/corrupted entry, and without this the seed data
    // could never come back once that happened (see PR feedback: seed
    // options not showing at all).
    if (!Array.isArray(parsed) || parsed.length === 0) return SEED_OPTIONS;
    return parsed;
  } catch {
    // Private-browsing / storage-blocked contexts fall back to the seed list
    // rather than breaking the prototype.
    return SEED_OPTIONS;
  }
};

const writeStore = (options: ComboboxOption[]): void => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(options));
  } catch {
    // Ignore — this is a mocked persistence layer for the prototype only.
  }

  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
};

/**
 * Gives every mounted `CreatableCombobox` a live view of the "shared" option
 * list and a way to add to it. See the module doc above for exactly what is
 * mocked here.
 */
export function useSharedOptions(): {
  options: ComboboxOption[];
  createOption: (label: string) => ComboboxOption;
} {
  const [options, setOptions] = useState<ComboboxOption[]>(readStore);

  useEffect(() => {
    const handleChange = () => setOptions(readStore());
    window.addEventListener(CHANGE_EVENT, handleChange);
    return () => window.removeEventListener(CHANGE_EVENT, handleChange);
  }, []);

  const createOption = useCallback((label: string): ComboboxOption => {
    const trimmed = label.trim();
    const current = readStore();
    const existing = current.find(
      (option) => option.label.toLowerCase() === trimmed.toLowerCase()
    );
    if (existing) return existing;

    const baseValue = slugify(trimmed) || `option-${Date.now()}`;
    let value = baseValue;
    let suffix = 1;
    while (current.some((option) => option.value === value)) {
      value = `${baseValue}-${++suffix}`;
    }

    const created: ComboboxOption = { value, label: trimmed };
    const next = [...current, created];
    writeStore(next);
    setOptions(next);
    return created;
  }, []);

  return { options, createOption };
}
