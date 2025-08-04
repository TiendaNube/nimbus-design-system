import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "../../ProgressBar";

const meta: Meta<typeof ProgressBar.Skeleton> = {
  title: "atomic/ProgressBar/ProgressBar.Skeleton",
  component: ProgressBar.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProgressBar.Skeleton>;

export const basic: Story = { args: {} };
