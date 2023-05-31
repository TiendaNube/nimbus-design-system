import type { Meta, StoryObj } from "@storybook/react";

import { List } from "../../List";

const meta: Meta<typeof List.SkeletonItem> = {
  title: "atomic/List/List.SkeletonItem",
  component: List.SkeletonItem,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof List.SkeletonItem>;

export const basic: Story = {
  args: {},
};
