import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "../../Tag";

const meta: Meta<typeof Tag.Skeleton> = {
  title: "atomic/Tag/Tag.Skeleton",
  component: Tag.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tag.Skeleton>;

export const basic: Story = { args: {} };
