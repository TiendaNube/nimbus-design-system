import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTheme } from "@nimbus-ds/styles";

/**
 * Runs as a layout effect in browsers and as a regular effect where there is
 * no DOM (server rendering), where layout effects only emit warnings.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

interface PortalHost {
  id: string;
  host: HTMLElement;
}

/**
 * Finds the direct child of `container` with the given identifier or creates
 * and appends it. Identifiers are compared as strings, so any value is valid.
 */
const resolveHost = (container: HTMLElement, id: string): HTMLElement => {
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
 * Returns the element where floating content must be portaled so that it stays
 * inside its own `ThemeProvider`.
 *
 * The host is a direct child of the nearest `ThemeProvider` element (or of
 * `document.body` when there is no provider) that carries the given identifier.
 * It is shared by every consumer of the same provider and identifier and is
 * never removed: its lifetime is the one of the provider element. Looking it up
 * among the provider's own children keeps the public identifier values on the
 * host without ever matching another provider's element.
 *
 * Returns `null` while disabled, before the host is resolved and on the server.
 * Inside a provider the host is never resolved against `document.body`, even
 * when the provider element is not attached yet.
 *
 * @param id Identifier of the host element.
 * @param enabled Whether the floating content needs a host.
 */
export const useThemePortalRoot = (
  id: string,
  enabled: boolean
): HTMLElement | null => {
  const { refThemeProvider } = useTheme();
  const [portalHost, setPortalHost] = useState<PortalHost | null>(null);

  const resolve = useCallback((): void => {
    const container =
      refThemeProvider === undefined ? document.body : refThemeProvider.current;
    if (!container) return;

    const host = resolveHost(container, id);
    setPortalHost((current) =>
      current?.id === id && current.host === host ? current : { id, host }
    );
  }, [id, refThemeProvider]);

  // Children run their layout effects before the provider element is attached,
  // so inside a provider the host may only be resolvable in the passive effect.
  useIsomorphicLayoutEffect(() => {
    if (enabled) resolve();
  }, [enabled, resolve]);

  useEffect(() => {
    if (enabled && portalHost?.id !== id) resolve();
  }, [enabled, id, portalHost, resolve]);

  return enabled && portalHost?.id === id ? portalHost.host : null;
};
