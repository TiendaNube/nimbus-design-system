import { useEffect, useState } from "react";
import { useTheme } from "@nimbus-ds/styles";

const HOST_USERS = Symbol.for("nimbus-ds.portalHost.users");
const HOST_OWNED = Symbol.for("nimbus-ds.portalHost.owned");

type PortalHost = HTMLElement & {
  [HOST_USERS]?: number;
  [HOST_OWNED]?: boolean;
};

type ResolvedHost = { id: string; element: HTMLElement };

export interface UseThemeScopedPortalHostOptions {
  /** Identifier of the floating host element, kept for consumers that look it up by id. */
  id: string;
  /** Whether the consumer currently renders floating content. No host is created while false. */
  active: boolean;
}

/**
 * Resolves the host element where a floating component renders its content,
 * scoped to the nearest theme provider (or the body when there is none).
 *
 * The identified host is looked up only among the direct children of that
 * container, never through a global id lookup, so content can never join the
 * wrapper of another provider. The host is created lazily by the first active
 * consumer, shared by the consumers of the same container and removed only when
 * Nimbus created it, nobody uses it and it holds no content. A host placed by
 * the consumer is reused and never removed.
 *
 * Returns null while inactive and during the render that follows an `id`
 * change, so callers mount their portal only while a matching host exists.
 */
export const useThemeScopedPortalHost = ({
  id,
  active
}: UseThemeScopedPortalHostOptions): HTMLElement | null => {
  const { refThemeProvider } = useTheme();
  const [resolved, setResolved] = useState<ResolvedHost | null>(null);

  useEffect(() => {
    if (!active) return undefined;

    const container: HTMLElement = refThemeProvider?.current ?? document.body;
    const existing = Array.from(container.children).find(
      (child): child is PortalHost => child.id === id
    );
    const host: PortalHost = existing ?? document.createElement("div");
    if (!existing) {
      host.id = id;
      host[HOST_OWNED] = true;
      container.appendChild(host);
    }
    host[HOST_USERS] = (host[HOST_USERS] ?? 0) + 1;
    setResolved({ id, element: host });

    return () => {
      host[HOST_USERS] = (host[HOST_USERS] ?? 1) - 1;
      if (
        host[HOST_USERS] === 0 &&
        host[HOST_OWNED] &&
        host.childElementCount === 0
      ) {
        host.remove();
      }
      setResolved(null);
    };
  }, [active, id, refThemeProvider]);

  return active && resolved?.id === id ? resolved.element : null;
};
