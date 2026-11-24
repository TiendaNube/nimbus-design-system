import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../../Avatar";

const meta: Meta<typeof Avatar.Skeleton> = {
  title: "atomic/Avatar/Avatar.Skeleton",
  component: Avatar.Skeleton,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Avatar.Skeleton>;

export const basic: Story = { args: {} };

export const small: Story = { args: { size: "small" } };

export const large: Story = { args: { size: "large" } };
