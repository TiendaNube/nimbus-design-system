import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { List } from "./List";

const meta: Meta<typeof List> = {
  title: "Atomic/List/List",
  component: List,
  render: (args) => (
    <List {...args}>
      <List.Item>Aliquam vitae eleifend nulla. Duis</List.Item>
      <List.Item>Nullam malesuada sapien sit amet</List.Item>
      <List.Item>Vivamus diam eros, pretium a</List.Item>
      <List.Item>Mauris ut feugiat quam. Fusce</List.Item>
      <List.Item>Duis leo orci, consectetur pulvinar</List.Item>
    </List>
  ),
  argTypes: {
    children: { control: { type: "text" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof List>;

export const basic: Story = {
  args: {},
};

export const unordered: Story = {
  args: {
    as: "ul",
  },
};

export const ordered: Story = {
  args: {
    as: "ol",
  },
};
