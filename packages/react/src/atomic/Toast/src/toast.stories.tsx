import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@nimbus-ds/button";
import { Box } from "@nimbus-ds/box";
import { Toast } from "./Toast";
import { useToast } from "./hooks";

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

type ToastTriggerProps = {
  text: string;
  onShowToast: () => void;
};

const ToastTrigger = ({ text, onShowToast }: ToastTriggerProps) => {
  const { addToast } = useToast();

  const handleClick = (): void => {
    onShowToast();

    addToast({
      id: "1",
      type: "success",
      text,
    });
  };

  return <Button onClick={handleClick}>Show toast</Button>;
};

export const withProviderDefault: Story = {
  render: () => (
    <Toast.Provider offset="default">
      <Box
        display="flex"
        flexDirection="column"
        gap="4"
        padding="4"
        minHeight="300px"
      >
        <ToastTrigger
          text="Toast triggered from button!"
          onShowToast={action("showToast")}
        />
      </Box>
    </Toast.Provider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default offset (2rem from bottom). Click the button to trigger a toast.",
      },
    },
  },
};

export const withProviderSingleBehavior: Story = {
  render: () => {
    const [index, setIndex] = useState(0);
    const handleClick = () => {
      setIndex(index + 1);
    };

    return (
      <Toast.Provider behavior="single">
        <Box
          display="flex"
          flexDirection="column"
          gap="4"
          padding="4"
          minHeight="300px"
        >
          <ToastTrigger
            text={`Show Toast ${index}`}
            onShowToast={handleClick}
          />
        </Box>
      </Toast.Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Single toast behavior. Only one toast is shown at a time.",
      },
    },
  },
};
