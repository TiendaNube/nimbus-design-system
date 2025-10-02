import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Atomic/Textarea",
  component: Textarea,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const textarea: Story = {
  args: {
    appearance: "neutral",
    lines: 2,
    id: "id",
    placeholder: "Placeholder text",
    disabled: false,
    resize: true,
  },
};

export const AiGeneratedTextarea: Story = {
  args: {
    aiGenerated: true,
    lines: 2,
    id: "ai-generated",
    placeholder: "AI generated textarea",
  },
};

export const WithResizeDisabled: Story = {
  args: {
    appearance: "neutral",
    lines: 4,
    id: "textarea-no-resize",
    placeholder: "This textarea cannot be resized",
    resize: false,
  },
};

export const ResizableTextarea: Story = {
  render: () => (
    <Box display="flex" gap="2" flexDirection="column">
      <Text fontSize="highlight" color="neutral-textHigh">
        Resizable
      </Text>
      <Textarea
        id="resizable"
        lines={3}
        placeholder="Try to resize this textarea by dragging the bottom-right corner"
        resize
      />
    </Box>
  ),
};

export const AutoGrowTextarea: Story = {
  args: {
    appearance: "neutral",
    lines: 2,
    id: "auto-grow",
    placeholder:
      "This textarea will auto grow up to 5 lines and then display a scrollbar",
    autoGrow: true,
    resize: false,
    maxLines: 5,
    minLines: 2,
  },
};

export const TransparentTextarea: Story = {
  args: {
    appearance: "transparent",
    lines: 2,
    id: "transparent",
    placeholder: "Transparent textarea",
    resize: false,
  },
};
