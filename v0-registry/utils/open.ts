export type OpenInV0Params = {
  /** Absolute URL to a registry item (e.g., https://registry/r/button.json) */
  registryItemUrl: string;
  /** Optional token to pass through to v0 */
  token?: string;
  /** Optional v0 base URL (defaults to https://v0.dev) */
  v0Base?: string;
  /** Whether to open in a new tab (default true) */
  newTab?: boolean;
};

import { buildV0OpenUrl } from "./url";

/**
 * Opens v0 with the provided registry item using window.open.
 */
export const openInV0 = ({ registryItemUrl, token, v0Base, newTab = true }: OpenInV0Params): void => {
  const href = buildV0OpenUrl({ registryItemUrl, token, v0Base });
  if (typeof window !== "undefined") {
    window.open(href, newTab ? "_blank" : "_self", "noopener,noreferrer");
  }
};


