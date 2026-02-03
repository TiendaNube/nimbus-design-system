import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@nimbus-ds/button";
import { Box } from "@nimbus-ds/box";
import { Toast } from "./Toast";
import { useToast } from "./hooks";
import { ToastOffset } from "./components";

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

const ToastTrigger: React.FC = () => {
  const { addToast } = useToast();

  const handleClick = (): void => {
    addToast({
      id: "1",
      type: "success",
      text: "Toast triggered from button!",
    });
  };

  return <Button onClick={handleClick}>Show Toast</Button>;
};

const OffsetTemplate: React.FC<{ offset: ToastOffset }> = ({ offset }) => (
  <Toast.Provider offset={offset}>
    <Box
      display="flex"
      flexDirection="column"
      gap="4"
      padding="4"
      minHeight="300px"
    >
      <ToastTrigger />
    </Box>
  </Toast.Provider>
);

export const withProviderDefault: Story = {
  render: () => <OffsetTemplate offset="default" />,
  parameters: {
    docs: {
      description: {
        story:
          "Default offset (2rem from bottom). Click the button to trigger a toast.",
      },
    },
  },
};

export const withProviderHighOffset: Story = {
  render: () => <OffsetTemplate offset="high" />,
  parameters: {
    docs: {
      description: {
        story:
          "High offset for mobile apps with bottom navigation. Uses safe-area-inset-bottom + 10rem.",
      },
    },
  },
};
