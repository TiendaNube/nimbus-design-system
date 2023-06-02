import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Atomic/Toast",
  component: Toast,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const basic: Story = {
  args: {
    text: "Primary toast",
    autoClose: false,
  },
};

export const primary: Story = {
  args: {
    text: "Primary toast",
    type: "primary",
    autoClose: false,
  },
};

export const success: Story = {
  args: {
    text: "Success toast",
    type: "success",
    autoClose: false,
  },
};

export const danger: Story = {
  args: {
    text: "Danger toast",
    type: "danger",
    autoClose: false,
  },
};

export const progress: Story = {
  args: {
    text: "Progress toast",
    type: "progress",
    autoClose: false,
  },
};
