import type { Meta, StoryObj } from "@storybook/react";
import { Thumbnail } from "../../Thumbnail";

const meta: Meta<typeof Thumbnail.Skeleton> = {
  title: "atomic/Thumbnail/Thumbnail.Skeleton",
  component: Thumbnail.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Thumbnail.Skeleton>;

export const basic: Story = {
  args: {
    width: "104px",
  },
};

export const percentage: Story = {
  args: {
    width: "30%",
  },
};
