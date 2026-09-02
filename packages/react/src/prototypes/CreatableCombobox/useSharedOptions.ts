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

export interface ComboboxOption {
  value: string;
  label: string;
}

const STORAGE_KEY = "nimbus-prototype:creatable-combobox:options";
const CHANGE_EVENT = "nimbus-prototype:creatable-combobox:options-changed";

// Obviously-fake sample data — generic product tags, nothing customer- or
// business-specific.
const SEED_OPTIONS: ComboboxOption[] = [
  { value: "eco-friendly", label: "Eco-friendly" },
  { value: "handmade", label: "Handmade" },
  { value: "limited-edition", label: "Limited edition" },
  { value: "vegan", label: "Vegan" },
  { value: "waterproof", label: "Waterproof" },
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
    return Array.isArray(parsed) ? parsed : SEED_OPTIONS;
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
