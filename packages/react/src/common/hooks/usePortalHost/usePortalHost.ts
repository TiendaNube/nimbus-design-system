import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTheme } from "@nimbus-ds/styles";

export interface UsePortalHostOptions {
  /** Identifier carried by the host element, shared by every consumer using the same value */
  id: string;
  /** Whether the consumer currently needs the host; nothing is resolved or created while false */
  enabled: boolean;
}

/** Layout effects only exist in the browser; fall back to a passive effect during server rendering. */
const useIsomorphicLayoutEffect =
  typeof document === "undefined" ? useEffect : useLayoutEffect;

/**
 * Finds a direct child of the container carrying the id, or creates and appends one.
 * Only direct children are inspected, so an element with the same id inside another
 * provider is never reused. An existing element is never altered.
 */
const findOrCreateHost = (container: HTMLElement, id: string): HTMLElement => {
  const existing = Array.from(container.children).find(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && child.id === id
  );
  if (existing) return existing;

  const host = document.createElement("div");
  host.id = id;
  container.appendChild(host);
  return host;
};

/**
 * Resolves the element that hosts the portaled content of a component.
 *
 * The host is a direct child of the element of the nearest enclosing `ThemeProvider`
 * (or of `document.body` when there is none), so the content always inherits the theme
 * of its own provider regardless of other providers or the order they mounted in.
 * Hosts are found or created, never removed: they are shared by all consumers using
 * the same id and leave the document together with their provider element.
 *
 * Returns `null` until the host is resolved. Pass the result as the `root` of a
 * `FloatingPortal` and do not pass an `id` to it, which would look the element up
 * across the whole document.
 */
export const usePortalHost = ({
  id,
  enabled,
}: UsePortalHostOptions): HTMLElement | null => {
  // Without a provider the context default is an empty object, which the type does not describe.
  const { refThemeProvider }: Partial<ReturnType<typeof useTheme>> = useTheme();
  const [host, setHost] = useState<HTMLElement | null>(null);

  const resolveHost = useCallback((): void => {
    if (!enabled) return;
    const container =
      refThemeProvider === undefined ? document.body : refThemeProvider.current;
    // The provider element is not attached yet; it is retried in the passive phase.
    if (!container) return;
    const resolved = findOrCreateHost(container, id);
    setHost((current) => (current === resolved ? current : resolved));
  }, [enabled, id, refThemeProvider]);

  useIsomorphicLayoutEffect(resolveHost, [resolveHost]);

  // A provider mounted in the same commit is attached after the layout effects of its children.
  useEffect(() => {
    if (host === null) resolveHost();
  }, [host, resolveHost]);

  return host;
};
