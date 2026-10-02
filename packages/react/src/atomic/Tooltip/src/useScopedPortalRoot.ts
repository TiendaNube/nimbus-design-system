import { useEffect, useState } from "react";

/**
 * Resolves the portal container for a floating element inside the enclosing
 * ThemeProvider. The container carries the documented id but is looked up only
 * among the provider's own children, so it never joins a same-id container that
 * belongs to another (possibly nested) ThemeProvider.
 * Returns `null` until the provider element is mounted.
 */
export const useScopedPortalRoot = (
  id: string,
  provider: { current: HTMLElement | null } | undefined
): HTMLElement | null => {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const providerElement = provider?.current;
    if (!providerElement) {
      setRoot(null);
      return;
    }
    let container = Array.from(providerElement.children).find(
      (child): child is HTMLElement => child.id === id
    );
    if (!container) {
      container = document.createElement("div");
      container.id = id;
      providerElement.appendChild(container);
    }
    setRoot(container);
  }, [id, provider]);

  return root;
};
