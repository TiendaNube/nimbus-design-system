export type BuildV0OpenUrlParams = {
  registryItemUrl: string;
  token?: string;
  v0Base?: string;
};

/**
 * Builds a v0 "open" URL using a registry item URL and optional token.
 */
export const buildV0OpenUrl = ({ registryItemUrl, token, v0Base = "https://v0.dev" }: BuildV0OpenUrlParams): string => {
  const url = new URL("/chat/api/open", v0Base);
  // searchParams handles encoding; pass raw URL here.
  url.searchParams.set("url", registryItemUrl);
  if (token) url.searchParams.set("token", token);
  return url.toString();
};

export type BuildRegistryItemUrlParams = {
  /** Base URL of your deployed registry app, e.g. https://registry.example.com */
  registryBaseUrl: string;
  /** The component name mapped to /r/${name}.json in your registry app */
  itemName: string;
};

/**
 * Returns the canonical /r/${name}.json endpoint for a given item.
 */
export const buildRegistryItemUrl = ({ registryBaseUrl, itemName }: BuildRegistryItemUrlParams): string => {
  const base = registryBaseUrl.endsWith("/") ? registryBaseUrl.slice(0, -1) : registryBaseUrl;
  return `${base}/v0-registry/components/${encodeURIComponent(itemName)}.json`;
};


