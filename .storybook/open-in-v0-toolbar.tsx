import React from "react";
import { addons, types } from "@storybook/manager-api";
import { IconButton } from "@storybook/components";

const V0_BASE = process.env.V0_BASE || "https://v0.dev";
const REGISTRY_BASE = process.env.NIMBUS_REGISTRY_BASE || "https://registry.example.com";
const TOKEN = process.env.NIMBUS_REGISTRY_TOKEN;

const buildHref = (itemName: string) => {
  const base = REGISTRY_BASE.replace(/\/$/, "");
  const itemUrl = `${base}/r/${encodeURIComponent(itemName)}.json`;
  const url = new URL("/chat/api/open", V0_BASE);
  url.searchParams.set("url", itemUrl);
  if (TOKEN) url.searchParams.set("token", TOKEN);
  return url.toString();
};

addons.register("nimbus/open-in-v0", () => {
  addons.add("nimbus/open-in-v0/tool", {
    title: "Open in v0",
    type: types.TOOL,
    match: ({ viewMode }) => !!viewMode,
    render: () => (
      <IconButton
        title="Open current component in v0"
        onClick={() => {
          // TODO: Enhance by mapping current story to itemName. Default to "button".
          const href = buildHref("button");
          window.open(href, "_blank", "noopener,noreferrer");
        }}
        placeholder="Open in v0"
      >
        v0
      </IconButton>
    ),
  });
});


