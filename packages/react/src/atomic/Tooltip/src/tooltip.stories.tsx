import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@nimbus-ds/text";
import { Box } from "@nimbus-ds/box";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Atomic/Tooltip",
  component: Tooltip,
  render: (args) => (
    <Box display="flex" justifyContent="center">
      <Tooltip {...args}>
        <Text>Hover</Text>
      </Tooltip>
    </Box>
  ),
  argTypes: {
    children: { control: { type: "text" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const basic: Story = {
  args: {
    content: "Lorem ipsum dolor site amet",
  },
};

export const top: Story = {
  args: {
    content: "Lorem ipsum dolor site amet",
    position: "top",
  },
};

export const bottom: Story = {
  args: {
    content: "Lorem ipsum dolor site amet",
    position: "bottom",
  },
};

export const right: Story = {
  args: {
    content: "Lorem ipsum dolor site amet",
    position: "right",
  },
};

export const left: Story = {
  args: {
    content: "Lorem ipsum dolor site amet",
    position: "left",
  },
};
