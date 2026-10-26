"use client";

import * as React from "react";
import { buildRegistryItemUrl, buildV0OpenUrl } from "../utils/url";

export type OpenInV0Props = {
  /** Base URL of the deployed registry app, e.g. https://registry.example.com */
  registryBaseUrl: string;
  /** Name of the item inside your registry (maps to /r/${name}.json) */
  itemName: string;
  /** Optional token appended to v0 open URL */
  token?: string;
  /** Optional v0 base (defaults to https://v0.dev) */
  v0Base?: string;
  /** Optional children to render; defaults to a simple button */
  children?: React.ReactNode;
  /** Render as href-only (anchor) instead of onClick window.open */
  asLink?: boolean;
  /** className passthrough for custom styling */
  className?: string;
};

export const OpenInV0: React.FC<OpenInV0Props> = ({
  registryBaseUrl,
  itemName,
  token = "",
  v0Base = "https://v0.dev",
  children = "Open in v0",
  asLink = false,
  className = "",
}: OpenInV0Props) => {
  const itemUrl = React.useMemo(
    () => buildRegistryItemUrl({ registryBaseUrl, itemName }),
    [registryBaseUrl, itemName]
  );

  const href = React.useMemo(
    () => buildV0OpenUrl({ registryItemUrl: itemUrl, token, v0Base }),
    [itemUrl, token, v0Base]
  );

  if (asLink) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </a>
    );
  }

  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button type="button" className={className} onClick={() => handleClick()}>
      {children}
    </button>
  );
};

OpenInV0.displayName = "OpenInV0";

export default OpenInV0;
