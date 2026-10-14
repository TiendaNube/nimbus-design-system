import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";

import { ExplorationPatterns204 } from "./ExplorationPatterns204";

const meta: Meta<typeof ExplorationPatterns204> = {
  title: "Prototypes/ExplorationPatterns204",
  component: ExplorationPatterns204,
  args: { expandable: true, api: "explicit" },
  argTypes: {
    api: {
      control: "radio",
      options: ["legacy", "explicit", "derived"],
    },
    expandable: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ExplorationPatterns204>;

export const Playground: Story = {
  render: (args) => (
    <Box display="flex" flexDirection="column" gap="6" padding="4">
      <ExplorationPatterns204 {...args} />
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium">Compare the three APIs</Text>
        <Text color="neutral-textLow">legacy: today, every cell is a button.</Text>
        <ExplorationPatterns204 expandable api="legacy" />
        <Text color="neutral-textLow">
          explicit: item-level expandable, inherits the container when unset.
        </Text>
        <ExplorationPatterns204 expandable api="explicit" />
        <Text color="neutral-textLow">
          derived: only cells with children are interactive.
        </Text>
        <ExplorationPatterns204 expandable api="derived" />
      </Box>
    </Box>
  ),
};

export const FullScreen: Story = {
  name: "Full screen",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <Box padding="4">
      <ExplorationPatterns204 expandable api="explicit" />
    </Box>
  ),
};
