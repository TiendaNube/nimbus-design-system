import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Atomic/Textarea",
  component: Textarea,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const textarea: Story = {
  args: {
    appearance: "neutral",
    lines: 2,
    id: "id",
    placeholder: "Placeholder text",
    disabled: false,
  },
};
