import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BoxPackedIcon } from "@nimbus-ds/icons";
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
