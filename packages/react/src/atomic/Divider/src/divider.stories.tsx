import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { SampleBox } from "@common/storybook";
import { Divider } from "./Divider";
import type { DividerProps } from "./divider.types";

const meta: Meta<typeof Divider> = {
  title: "Atomic/Divider",
  component: Divider,
  argTypes: {
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
    },
  },
  render: (args: DividerProps) => (
    <Box height="10rem" width="10rem">
      <SampleBox gap="4">
        <Divider {...args} />
      </SampleBox>
    </Box>
  ),
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const basic: Story = {
  args: {},
};

export const vertical: Story = {
  render: (args: DividerProps) => (
    <Box height="10rem" width="10rem">
      <SampleBox borderRadius="none" gap="4">
        <Box height="50%">
          <Divider {...args} />
        </Box>
        <Box height="75%">
          <Divider {...args} />
        </Box>
        <Divider {...args} />
      </SampleBox>
    </Box>
  ),
  args: {
    orientation: "vertical",
    thickness: 2,
  },
};

export const thickness2: Story = {
  args: {
    thickness: 2,
  },
};

export const thickness3: Story = {
  args: {
    thickness: 3,
  },
};
