import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Card } from "@nimbus-ds/card";

import { Exploration553 } from "./Exploration553";
import type { Exploration553Item } from "./Exploration553";

const longPath: Exploration553Item[] = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Clothing", href: "#clothing" },
  { label: "Women", href: "#women" },
  { label: "Dresses", href: "#dresses" },
  { label: "Summer collection" },
];

const shortPath: Exploration553Item[] = [
  { label: "Home", href: "#home" },
  { label: "Settings", href: "#settings" },
  { label: "Shipping methods" },
];

const meta: Meta<typeof Exploration553> = {
  title: "Prototypes/Exploration553",
  component: Exploration553,
  args: {
    items: shortPath,
    maxVisible: 4,
    compact: false,
  },
  argTypes: {
    items: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Exploration553>;

export const Playground: Story = {
  render: (args) => {
    const [navigated, setNavigated] = useState<string | null>(null);
    const itemsWithHandlers = args.items.map((item) => ({
      ...item,
      onNavigate: (navigatedItem: Exploration553Item) =>
        setNavigated(navigatedItem.label),
    }));

    return (
      <Box display="flex" flexDirection="column" gap="4">
        <Card padding="base">
          <Box display="flex" flexDirection="column" gap="4">
            <Text fontWeight="bold">Short path (3 levels)</Text>
            <Exploration553
              items={shortPath.map((item) => ({
                ...item,
                onNavigate: (navigatedItem) =>
                  setNavigated(navigatedItem.label),
              }))}
              maxVisible={args.maxVisible}
              compact={args.compact}
            />
          </Box>
        </Card>

        <Card padding="base">
          <Box display="flex" flexDirection="column" gap="4">
            <Text fontWeight="bold">Long path (6 levels, collapsing)</Text>
            <Exploration553
              items={itemsWithHandlers}
              maxVisible={args.maxVisible}
              compact={args.compact}
            />
          </Box>
        </Card>

        {navigated && (
          <Text fontSize="caption" color="neutral-textLow">
            Simulated navigation to: {navigated}
          </Text>
        )}
      </Box>
    );
  },
};

export const FullScreen: Story = {
  name: "Full screen",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
  render: () => {
    const [navigated, setNavigated] = useState<string | null>(null);

    const withHandlers = (path: Exploration553Item[]) =>
      path.map((item) => ({
        ...item,
        onNavigate: (navigatedItem: Exploration553Item) =>
          setNavigated(navigatedItem.label),
      }));

    return (
      <Box padding="6" display="flex" flexDirection="column" gap="8">
        <Box display="flex" flexDirection="column" gap="2">
          <Text fontSize="highlight" fontWeight="bold">
            Breadcrumb exploration — issue #553
          </Text>
          <Text color="neutral-textLow">
            Try the collapsed middle levels on the long path, and compare the
            compact (mobile-style) treatment against the full path.
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" gap="6">
          <Card padding="base">
            <Box display="flex" flexDirection="column" gap="4">
              <Text fontWeight="bold">Desktop — short path</Text>
              <Exploration553 items={withHandlers(shortPath)} />
            </Box>
          </Card>

          <Card padding="base">
            <Box display="flex" flexDirection="column" gap="4">
              <Text fontWeight="bold">
                Desktop — long path, collapsed to 4 visible levels
              </Text>
              <Exploration553 items={withHandlers(longPath)} maxVisible={4} />
            </Box>
          </Card>

          <Card padding="base">
            <Box display="flex" flexDirection="column" gap="4">
              <Text fontWeight="bold">Desktop — long path, all 6 levels</Text>
              <Exploration553 items={withHandlers(longPath)} maxVisible={99} />
            </Box>
          </Card>

          <Card padding="base">
            <Box display="flex" flexDirection="column" gap="4">
              <Text fontWeight="bold">
                Compact (simulated mobile) — back-to-parent only
              </Text>
              <Exploration553 items={withHandlers(longPath)} compact />
            </Box>
          </Card>
        </Box>

        {navigated && (
          <Text fontSize="caption" color="neutral-textLow">
            Simulated navigation to: {navigated}
          </Text>
        )}
      </Box>
    );
  },
};
