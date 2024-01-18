import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Tag } from "@nimbus-ds/tag";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Composite/Tabs",
  component: Tabs,
  render: (args) => (
    <Tabs {...args}>
      <Tabs.Item label="Tab 1" labelContent={<Tag>Some tag</Tag>}>
        <Box
          borderColor="neutral-interactive"
          borderStyle="dashed"
          borderWidth="1"
          padding="2"
        >
          <Text fontSize="base" textAlign="center">
            Replace me with your tab 1 content
          </Text>
        </Box>
      </Tabs.Item>
      <Tabs.Item label="Tab 2">
        <Box
          borderColor="neutral-interactive"
          borderStyle="dashed"
          borderWidth="1"
          padding="2"
        >
          <Text fontSize="base" textAlign="center">
            Replace me with your tab 2 content
          </Text>
        </Box>
      </Tabs.Item>
      <Tabs.Item label="Tab 3">
        <Box
          borderColor="neutral-interactive"
          borderStyle="dashed"
          borderWidth="1"
          padding="2"
        >
          <Text fontSize="base" textAlign="center">
            Replace me with your tab 3 content
          </Text>
        </Box>
      </Tabs.Item>
    </Tabs>
  ),
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const basic: Story = {
  args: {
    preSelectedTab: 2,
  },
};

export const fullWidth: Story = {
  args: {
    fullWidth: true,
  },
};
