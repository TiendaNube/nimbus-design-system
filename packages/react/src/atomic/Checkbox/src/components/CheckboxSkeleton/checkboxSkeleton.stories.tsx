import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../../Checkbox";

const meta: Meta<typeof Checkbox.Skeleton> = {
  title: "atomic/Checkbox/Checkbox.Skeleton",
  component: Checkbox.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox.Skeleton>;

export const basic: Story = { args: {} };
