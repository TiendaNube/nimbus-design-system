import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Link } from "@nimbus-ds/link";
import { Tabs } from "@nimbus-ds/tabs";

import { Breadcrumb, type BreadcrumbItem } from "./Exploration553";

const SAMPLE_LEVELS = [
  "Home",
  "Settings",
  "Payments",
  "Payment methods",
  "Mercado Pago",
  "Installments configuration",
  "Advanced rules",
];

function buildItems(count: number, longLabels: boolean): BreadcrumbItem[] {
  const labels = longLabels
    ? SAMPLE_LEVELS.map((label) => `${label} for the whole store configuration`)
    : SAMPLE_LEVELS;

  return labels.slice(0, Math.max(count, 1)).map((label, index) => ({
    id: `level-${index}`,
    label,
    href: `#level-${index}`,
  }));
}

function InteractiveDemo({
  totalItems,
  maxVisible,
  longLabels,
}: {
  totalItems: number;
  maxVisible: number;
  longLabels: boolean;
}) {
  const allItems = buildItems(totalItems, longLabels);
  const [depth, setDepth] = useState(allItems.length);

  const visibleDepth = Math.min(depth, allItems.length);
  const items = allItems.slice(0, visibleDepth).map((item, index, arr) => ({
    ...item,
    onNavigate:
      index === arr.length - 1 ? undefined : () => setDepth(index + 1),
  }));

  return (
    <Box display="flex" flexDirection="column" gap="4" padding="4" maxWidth="480px">
      <Breadcrumb items={items} maxVisible={maxVisible} />
      <Text fontSize="caption" color="neutral-textLow">
        Showing level {visibleDepth} of {allItems.length}. Click any ancestor
        level in the trail to navigate back to it.
      </Text>
      {visibleDepth < allItems.length && (
        <Box>
          <Link
            as="button"
            appearance="primary"
            onClick={() => setDepth(allItems.length)}
          >
            Go back to the deepest level
          </Link>
        </Box>
      )}
    </Box>
  );
}

const meta: Meta = {
  title: "Prototypes/Exploration553",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const Playground: Story = {
  args: {
    totalItems: 6,
    maxVisible: 4,
    longLabels: false,
  },
  argTypes: {
    totalItems: { control: { type: "range", min: 1, max: 7, step: 1 } },
    maxVisible: { control: { type: "range", min: 2, max: 6, step: 1 } },
    longLabels: { control: "boolean" },
  },
  render: (args) => (
    <InteractiveDemo
      totalItems={args.totalItems as number}
      maxVisible={args.maxVisible as number}
      longLabels={args.longLabels as boolean}
    />
  ),
};

export const FullScreen: Story = {
  name: "Full screen",
  parameters: { layout: "fullscreen" },
  argTypes: {
    totalItems: { control: false },
    maxVisible: { control: false },
    longLabels: { control: false },
  },
  render: () => {
    const items = buildItems(6, false).map((item, index, arr) => ({
      ...item,
      onNavigate: index === arr.length - 1 ? undefined : () => {},
    }));

    return (
      <Box display="flex" flexDirection="column" gap="4" padding="6">
        <Breadcrumb items={items} maxVisible={4} />

        <Text fontSize="caption" color="neutral-textLow">
          Below: an existing Nimbus Tabs pattern for switching between
          same-level views, to check the two navigation patterns do not
          visually or semantically compete.
        </Text>

        <Tabs preSelectedTab={0}>
          <Tabs.Item label="General">
            <Box borderColor="neutral-interactive" borderStyle="dashed" borderWidth="1" padding="4">
              <Text fontSize="base" textAlign="center">
                Page content for the current breadcrumb level.
              </Text>
            </Box>
          </Tabs.Item>
          <Tabs.Item label="Advanced">
            <Box borderColor="neutral-interactive" borderStyle="dashed" borderWidth="1" padding="4">
              <Text fontSize="base" textAlign="center">
                An alternate view at the same hierarchy level.
              </Text>
            </Box>
          </Tabs.Item>
        </Tabs>
      </Box>
    );
  },
};
