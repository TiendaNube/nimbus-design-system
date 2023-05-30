import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "../../Select";

const meta: Meta<typeof Select.Skeleton> = {
  title: "atomic/Select/Select.Skeleton",
  component: Select.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select.Skeleton>;

export const basic: Story = { args: {} };
