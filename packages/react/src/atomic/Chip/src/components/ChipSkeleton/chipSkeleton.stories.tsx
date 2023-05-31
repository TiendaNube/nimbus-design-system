import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "../../Chip";

const meta: Meta<typeof Chip.Skeleton> = {
  title: "atomic/Chip/Chip.Skeleton",
  component: Chip.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Chip.Skeleton>;

export const basic: Story = { args: {} };
