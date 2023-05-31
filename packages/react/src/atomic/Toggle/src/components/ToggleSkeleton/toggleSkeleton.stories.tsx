import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "../../Toggle";

const meta: Meta<typeof Toggle.Skeleton> = {
  title: "atomic/Toggle/Toggle.Skeleton",
  component: Toggle.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toggle.Skeleton>;

export const basic: Story = { args: {} };
