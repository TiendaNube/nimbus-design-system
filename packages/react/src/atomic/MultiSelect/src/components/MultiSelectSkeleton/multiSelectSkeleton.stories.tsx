import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "../../MultiSelect";

const meta: Meta<typeof MultiSelect.Skeleton> = {
  title: "atomic/MultiSelect/MultiSelect.Skeleton",
  component: MultiSelect.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiSelect.Skeleton>;

export const basic: Story = { args: {} };
