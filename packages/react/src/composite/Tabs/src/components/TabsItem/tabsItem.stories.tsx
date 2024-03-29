import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Tabs } from "../../Tabs";

const meta: Meta<typeof Tabs.Item> = {
  title: "Composite/Tabs/Tabs.Item",
  component: Tabs.Item,
  render: (args) => (
    <Tabs>
      <Tabs.Item {...args}>
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
    </Tabs>
  ),
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs.Item>;

export const basic: Story = {
  args: {
    label: "Tab 1",
  },
};
