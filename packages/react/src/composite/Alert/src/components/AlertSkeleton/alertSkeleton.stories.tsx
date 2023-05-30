import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "../../Alert";

const meta: Meta<typeof Alert.Skeleton> = {
  title: "composite/Alert/Alert.Skeleton",
  component: Alert.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Alert.Skeleton>;

export const basic: Story = { args: {} };
