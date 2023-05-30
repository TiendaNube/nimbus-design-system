import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "../../IconButton";

const meta: Meta<typeof IconButton.Skeleton> = {
  title: "atomic/IconButton/IconButton.Skeleton",
  component: IconButton.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IconButton.Skeleton>;

export const basic: Story = { args: {} };
