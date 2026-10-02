import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTheme } from "@nimbus-ds/styles";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Returns the direct child of `base` with the given id, creating it when it
 * does not exist yet. The lookup is limited to direct children so that a
 * wrapper owned by another ThemeProvider, or by the document body, is never
 * reused. Wrappers are shared by every float of the same base and id, so they
 * are intentionally kept after unmount.
 */
const getOrCreateWrapper = (base: HTMLElement, id: string): HTMLElement => {
  const existing = Array.from(base.children).find(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && child.id === id
  );
  if (existing) return existing;

  const wrapper = document.createElement("div");
  wrapper.id = id;
  base.appendChild(wrapper);
  return wrapper;
};

/**
 * Resolves the element a FloatingPortal should mount into, scoped to the
 * nearest ThemeProvider. Inside a ThemeProvider it returns a wrapper with the
 * given id that is a direct child of that provider; without a provider it
 * returns a wrapper that is a direct child of `document.body`.
 *
 * Pass the result as the `root` of FloatingPortal and do not pass its `id`:
 * FloatingPortal looks the id up across the whole document, which lets the
 * first wrapper capture floats rendered under a different provider.
 *
 * Returns `null` while the target is not resolved yet (for example before the
 * ThemeProvider element is attached) or when `enabled` is false, so
 * FloatingPortal waits instead of falling back to another container.
 *
 * @param id Id of the wrapper element, such as "nimbus-tooltip-floating".
 * @param enabled Whether the wrapper should be resolved. Defaults to true.
 */
export const useFloatingRoot = (
  id: string,
  enabled = true
): HTMLElement | null => {
  const { refThemeProvider } = useTheme();
  const [root, setRoot] = useState<HTMLElement | null>(null);

  const resolve = useCallback(() => {
    if (!enabled) return;
    const base = refThemeProvider ? refThemeProvider.current : document.body;
    if (!base) return;
    setRoot(getOrCreateWrapper(base, id));
  }, [enabled, id, refThemeProvider]);

  // The layout effect resolves the root before paint in the common case. The
  // passive effect runs after the whole commit, once a ThemeProvider mounted
  // in the same commit has attached its element.
  useIsoLayoutEffect(resolve, [resolve]);
  useEffect(resolve, [resolve]);

  return root;
};
