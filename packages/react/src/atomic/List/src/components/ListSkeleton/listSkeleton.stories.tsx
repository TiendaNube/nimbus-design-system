import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { List } from "../../List";

const meta: Meta<typeof List.Skeleton> = {
  title: "atomic/List/List.Skeleton",
  component: List.Skeleton,
  render: (args) => (
    <List.Skeleton {...args}>
      <List.SkeletonItem />
      <List.SkeletonItem />
      <List.SkeletonItem />
      <List.SkeletonItem />
      <List.SkeletonItem />
    </List.Skeleton>
  ),
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof List.Skeleton>;

export const basice: Story = {
  args: {},
};
