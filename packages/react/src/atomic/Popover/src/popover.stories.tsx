import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@nimbus-ds/text";
import { Box } from "@nimbus-ds/box";

import { Popover } from "./Popover";

const meta: Meta<typeof Popover> = {
  title: "Atomic/Popover/Popover",
  component: Popover,
  render: (args) => (
    <Box display="flex" justifyContent="center">
      <Popover {...args} onVisibility={undefined}>
        <Text>Click-Hover</Text>
      </Popover>
    </Box>
  ),
  argTypes: {
    children: { control: { disable: true } },
    content: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const basic: Story = {
  args: {
    content: <Text color="primary-textLow">Replace me with your content</Text>,
  },
};

export const top: Story = {
  args: {
    content: <Text color="primary-textLow">Replace me with your content</Text>,
    position: "top",
    enabledHover: true,
    enabledDismiss: false,
  },
};

export const bottom: Story = {
  args: {
    content: <Text color="primary-textLow">Replace me with your content</Text>,
    position: "bottom",
    enabledHover: true,
    enabledDismiss: false,
  },
};

export const right: Story = {
  args: {
    content: <Text color="primary-textLow">Replace me with your content</Text>,
    position: "right",
    enabledHover: true,
    enabledDismiss: false,
  },
};

export const left: Story = {
  args: {
    content: <Text color="primary-textLow">Replace me with your content</Text>,
    position: "left",
    enabledHover: true,
    enabledDismiss: false,
  },
};
