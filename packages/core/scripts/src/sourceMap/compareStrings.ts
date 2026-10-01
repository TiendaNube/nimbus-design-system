/**
 * Plain codepoint comparison — no ICU/locale involved, so the order is the
 * same on every host regardless of default locale or Node's ICU build.
 * `localeCompare()` is locale-sensitive by default (e.g. "icon.docs.json"
 * vs "Icon.tsx" can sort differently between en-US and tr-TR), which would
 * make `source-map:check`'s byte-for-byte diff flaky across machines.
 */
export function compareStrings(a: string, b: string): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
