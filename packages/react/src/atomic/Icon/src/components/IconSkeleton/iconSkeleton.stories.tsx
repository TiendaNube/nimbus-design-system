import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../../Icon";

const meta: Meta<typeof Icon.Skeleton> = {
  title: "atomic/Icon/Icon.Skeleton",
  component: Icon.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Icon.Skeleton>;

export const basic: Story = { args: {} };
