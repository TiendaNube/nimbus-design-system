import type { Meta, StoryObj } from "@storybook/react";

import { ListItem } from "./ListItem";

const meta: Meta<typeof ListItem> = {
  title: "Atomic/List/List.Item",
  component: ListItem,
  argTypes: {
    children: { control: { type: "text" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const basic: Story = {
  args: {
    children: "Aliquam vitae eleifend nulla. Duis",
  },
};
