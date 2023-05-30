import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "../../Text";

const meta: Meta<typeof Text.Skeleton> = {
  title: "atomic/Text/Text.Skeleton",
  component: Text.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Text.Skeleton>;

export const basic: Story = { args: {} };
