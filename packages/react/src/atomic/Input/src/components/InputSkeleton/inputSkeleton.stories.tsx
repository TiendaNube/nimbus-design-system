import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../../Input";

const meta: Meta<typeof Input.Skeleton> = {
  title: "atomic/Input/Input.Skeleton",
  component: Input.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input.Skeleton>;

export const basic: Story = { args: {} };
