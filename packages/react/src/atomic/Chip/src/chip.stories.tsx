import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BoxPackedIcon } from "@nimbus-ds/icons";
import { Box } from "@nimbus-ds/box";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Atomic/Chip",
  component: Chip,
  argTypes: {
    icon: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const basic: Story = {
  args: {
    text: "Text",
    icon: <BoxPackedIcon size={12} />,
  },
};

export const removable: Story = {
  args: {
    text: "Text",
    icon: <BoxPackedIcon size={12} />,
    removable: true,
  },
};

export const stressed: Story = {
  render: (args) => {
    const chips = Array.from({ length: 5 }, (_, index) => (
      <Chip key={index} {...args} />
    ));
    return (
      <Box display="flex" flexWrap="wrap" gap="2">
        {chips}
      </Box>
    );
  },
  args: {
    text: "This is a very stressed chip to showcase what happens when there's a lot of text",
    icon: <BoxPackedIcon size={12} />,
    removable: true,
  },
};

export const aiGradient: Story = {
  args: {
    text: "AI Chip",
    icon: <BoxPackedIcon size={12} />,
    appearance: "ai-gradient",
  },
};

export const aiGradientRemovable: Story = {
  args: {
    text: "AI Chip",
    icon: <BoxPackedIcon size={12} />,
    appearance: "ai-gradient",
    removable: true,
  },
};
