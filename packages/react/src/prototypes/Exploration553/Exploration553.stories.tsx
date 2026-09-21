import React from "react";
import { Box } from "@nimbus-ds/box";
import { Breadcrumb } from "./Exploration553";

const shortTrail = [
  { label: "Home", href: "/" },
  { label: "Settings", href: "/settings" },
  { label: "Shipping" },
];

const longTrail = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog" },
  { label: "Categories", href: "/catalog/categories" },
  { label: "Footwear", href: "/catalog/categories/footwear" },
  { label: "Running shoes", href: "/catalog/categories/footwear/running" },
  { label: "Nimbus Runner 3" },
];

export default {
  title: "Prototypes/Exploration553",
  component: Breadcrumb,
};

export const Playground = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="8" padding="4">
      <Box display="flex" flexDirection="column" gap="2">
        <Box as="p">Short trail (fits, no collapse)</Box>
        <Breadcrumb items={shortTrail} />
      </Box>
      <Box display="flex" flexDirection="column" gap="2">
        <Box as="p">Long trail (collapses middle segments behind "...")</Box>
        <Breadcrumb items={longTrail} maxVisible={3} />
      </Box>
    </Box>
  ),
};

export const FullScreen = {
  name: "Full screen",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
  render: () => (
    <Box padding="8">
      <Breadcrumb items={longTrail} maxVisible={3} />
    </Box>
  ),
};
