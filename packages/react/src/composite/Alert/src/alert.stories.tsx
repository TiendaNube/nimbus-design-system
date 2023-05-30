import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Composite/Alert/Alert",
  component: Alert,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const basic: Story = {
  args: {
    appearance: "neutral",
    title: "Alert title",
    children: "Alert content",
  },
};

export const neutral: Story = {
  args: {
    appearance: "neutral",
    title: "Alert title",
    children: "Alert content",
  },
};

export const primary: Story = {
  args: {
    appearance: "primary",
    title: "Alert title",
    children: "Alert content",
  },
};

export const success: Story = {
  args: {
    appearance: "success",
    title: "Alert title",
    children: "Alert content",
  },
};

export const warning: Story = {
  args: {
    appearance: "warning",
    title: "Alert title",
    children: "Alert content",
  },
};

export const danger: Story = {
  args: {
    appearance: "danger",
    title: "Alert title",
    children: "Alert content",
  },
};

export const stressed: Story = {
  args: {
    title: "Very long title with a lot of characters",
    children:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse convallis, urna eu blandit iaculis, lacus ante faucibus dui, ut tempus velit lectus non nunc. Aenean.",
  },
};

export const variableContent: Story = {
  args: {
    title: "Alert with components as children",
    children: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget.
        <Box display="flex" gap="2" flexWrap="wrap">
          <Button>Primary action</Button>
          <Button>Secondary action</Button>
        </Box>
      </>
    ),
  },
};
