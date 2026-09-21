import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";

import { Exploration553, type Exploration553Item } from "./Exploration553";

const SAMPLE_HIERARCHY: Exploration553Item[] = [
  { label: "Home", href: "#home" },
  { label: "Settings", href: "#settings" },
  { label: "Shipping", href: "#settings/shipping" },
  { label: "Zones", href: "#settings/shipping/zones" },
  { label: "Argentina", href: "#settings/shipping/zones/argentina" },
  { label: "Buenos Aires" },
];

const buildItems = (depth: number): Exploration553Item[] =>
  SAMPLE_HIERARCHY.slice(0, Math.max(1, Math.min(depth, SAMPLE_HIERARCHY.length)));

interface PlaygroundArgs {
  depth: number;
  maxVisibleItems: number;
}

const PlaygroundRender = ({ depth, maxVisibleItems }: PlaygroundArgs) => (
  <Box padding="4">
    <Exploration553 items={buildItems(depth)} maxVisibleItems={maxVisibleItems} />
  </Box>
);

const meta: Meta<PlaygroundArgs> = {
  title: "Prototypes/Exploration553",
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  render: (args) => <PlaygroundRender {...args} />,
  args: {
    depth: 6,
    maxVisibleItems: 4,
  },
  argTypes: {
    depth: {
      control: { type: "range", min: 1, max: SAMPLE_HIERARCHY.length, step: 1 },
      description: "How many levels of the sample hierarchy to render.",
    },
    maxVisibleItems: {
      control: { type: "range", min: 2, max: SAMPLE_HIERARCHY.length, step: 1 },
      description:
        "Crumbs shown before collapsing the middle levels behind an ellipsis.",
    },
  },
};

export const FullScreen: Story = {
  name: "Full screen",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
  render: () => (
    <Box padding="8" display="flex" gap="6">
      <Box display="flex" flexDirection="column" gap="2">
        <Text as="span" fontSize="caption" color="neutral-textLow">
          Deep hierarchy, collapsed by default — try the "…" to expand
        </Text>
        <Exploration553 items={SAMPLE_HIERARCHY} maxVisibleItems={4} />
      </Box>
      <Box display="flex" flexDirection="column" gap="2">
        <Text as="span" fontSize="caption" color="neutral-textLow">
          Shallow hierarchy, no collapse needed
        </Text>
        <Exploration553 items={SAMPLE_HIERARCHY.slice(0, 3)} maxVisibleItems={4} />
      </Box>
    </Box>
  ),
};
