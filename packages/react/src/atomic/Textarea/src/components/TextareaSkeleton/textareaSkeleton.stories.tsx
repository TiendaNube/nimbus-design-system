import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "../../Textarea";

const meta: Meta<typeof Textarea.Skeleton> = {
  title: "atomic/Textarea/Textarea.Skeleton",
  component: Textarea.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Textarea.Skeleton>;

export const basic: Story = { args: {} };
