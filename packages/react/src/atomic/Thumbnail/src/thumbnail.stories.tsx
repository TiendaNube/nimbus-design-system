import type { Meta, StoryObj } from "@storybook/react";
import { Thumbnail } from "./Thumbnail";

const meta: Meta<typeof Thumbnail> = {
  title: "Atomic/Thumbnail/Thumbnail",
  component: Thumbnail,
  argTypes: {
    children: { control: { type: "text" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Thumbnail>;

export const basic: Story = {
  args: {
    width: "104px",
    src: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=943&q=80",
  },
};

export const emnpty: Story = {
  args: {
    width: "104px",
  },
};
