import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../Button";

const meta: Meta<typeof Button.Skeleton> = {
  title: "atomic/Button/Button.Skeleton",
  component: Button.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button.Skeleton>;

export const basic: Story = { args: {} };
