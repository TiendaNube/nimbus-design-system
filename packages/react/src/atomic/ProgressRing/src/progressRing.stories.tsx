import type { Meta, StoryObj } from "@storybook/react";
import { ProgressRing } from "./ProgressRing";

const meta: Meta<typeof ProgressRing> = {
  title: "Atomic/ProgressRing",
  component: ProgressRing,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof ProgressRing>;

export const basic: Story = {
  args: {
    value: 60,
    "aria-label": "Setup progress"
  }
};

export const large: Story = {
  args: {
    value: 60,
    size: "large",
    "aria-label": "Setup progress"
  }
};

export const medium: Story = {
  args: {
    value: 60,
    size: "medium",
    "aria-label": "Setup progress"
  }
};

export const small: Story = {
  args: {
    value: 60,
    size: "small",
    "aria-label": "Setup progress"
  }
};

export const empty: Story = {
  args: {
    value: 0,
    "aria-label": "Setup progress"
  }
};

export const complete: Story = {
  args: {
    value: 100,
    "aria-label": "Setup progress"
  }
};
