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
  longLabels,
  containerWidth,
}: {
  totalItems: number;
  longLabels: boolean;
  containerWidth: number;
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
    <Box display="flex" flexDirection="column" gap="4" padding="4">
      <Box
        maxWidth={`${containerWidth}px`}
        borderColor="neutral-interactive"
        borderStyle="dashed"
        borderWidth="1"
        padding="2"
      >
        <Breadcrumb items={items} />
      </Box>
      <Text fontSize="caption" color="neutral-textLow">
        Container width: {containerWidth}px. Showing level {visibleDepth} of{" "}
        {allItems.length}. The first and current levels always stay visible;
        whatever no longer fits between them collapses behind the overflow
        menu. Click any visible ancestor level to navigate back to it.
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
    longLabels: false,
    containerWidth: 360,
  },
  argTypes: {
    totalItems: { control: { type: "range", min: 1, max: 7, step: 1 } },
    longLabels: { control: "boolean" },
    containerWidth: {
      control: { type: "range", min: 160, max: 720, step: 20 },
    },
  },
  render: (args) => (
    <InteractiveDemo
      totalItems={args.totalItems as number}
      longLabels={args.longLabels as boolean}
      containerWidth={args.containerWidth as number}
    />
  ),
};

export const FullScreen: Story = {
  name: "Full screen",
  parameters: { layout: "fullscreen" },
  argTypes: {
    totalItems: { control: false },
    longLabels: { control: false },
    containerWidth: { control: false },
  },
  render: () => {
    const items = buildItems(6, false).map((item, index, arr) => ({
      ...item,
      onNavigate: index === arr.length - 1 ? undefined : () => {},
    }));

    return (
      <Box display="flex" flexDirection="column" gap="6" padding="6">
        <Box display="flex" flexDirection="column" gap="2">
          <Text fontSize="caption" fontWeight="bold">
            Full available width
          </Text>
          <Breadcrumb items={items} />
        </Box>

        <Box display="flex" flexDirection="column" gap="2">
          <Text fontSize="caption" fontWeight="bold">
            Constrained to 360px, e.g. a narrow panel
          </Text>
          <Box
            maxWidth="360px"
            borderColor="neutral-interactive"
            borderStyle="dashed"
            borderWidth="1"
            padding="2"
          >
            <Breadcrumb items={items} />
          </Box>
        </Box>

        <Text fontSize="caption" color="neutral-textLow">
          Below: an existing Nimbus Tabs pattern for switching between
          same-level views, to check the two navigation patterns do not
          visually or semantically compete at any trail width.
        </Text>

        <Tabs preSelectedTab={0}>
          <Tabs.Item label="General">
            <Box
              borderColor="neutral-interactive"
              borderStyle="dashed"
              borderWidth="1"
              padding="4"
            >
              <Text fontSize="base" textAlign="center">
                Page content for the current breadcrumb level.
              </Text>
            </Box>
          </Tabs.Item>
          <Tabs.Item label="Advanced">
            <Box
              borderColor="neutral-interactive"
              borderStyle="dashed"
              borderWidth="1"
              padding="4"
            >
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
