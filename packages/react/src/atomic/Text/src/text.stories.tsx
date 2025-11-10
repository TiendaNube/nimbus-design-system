import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { text } from "@nimbus-ds/styles";
import { Box } from "@nimbus-ds/box";
import { argTypesConvert } from ".storybook/utils";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Atomic/Text",
  component: Text,
  argTypes: {
    children: { control: { type: "text" } },
    ...argTypesConvert(text.properties),
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const basic: Story = {
  args: {
    children: "Lorem ipsum dolor sit amet",
  },
};

export const p: Story = {
  args: {
    as: "p",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const span: Story = {
  args: {
    as: "span",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const primary: Story = {
  args: {
    color: "primary-textLow",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const success: Story = {
  args: {
    color: "success-textLow",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const warning: Story = {
  args: {
    color: "warning-textLow",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const danger: Story = {
  args: {
    color: "danger-textLow",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const neutral: Story = {
  args: {
    color: "neutral-textLow",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const responsive: Story = {
  args: {
    children: "Lorem ipsum dolor sit amet",
    textAlign: { xs: "center", md: "center", lg: "right", xl: "center" },
  },
};

export const lineClamp: Story = {
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et nisi sit amet quam convallis consectetur. Vestibulum hendrerit ac urna eget rhoncus. Aliquam non velit finibus sem gravida pretium. In neque metus, interdum a quam id, pulvinar consequat leo. Proin sapien mauris, efficitur ut mi at, finibus commodo metus. Pellentesque ac pellentesque risus. Nulla facilisi.",
    textAlign: "left",
    lineClamp: 1,
  },
};

export const textDecoration: Story = {
  args: {
    children: "Lorem ipsum dolor sit amet",
    textDecoration: "line-through",
  },
};

export const aiGenerative: Story = {
  args: {
    color: "ai-generative",
    children: "AI Generated Content",
    fontSize: "highlight",
    fontWeight: "bold",
  },
};

export const textOverflowEllipsis: Story = {
  args: {
    children:
      "This is a very long text that will be truncated with an ellipsis when it overflows the container width",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  decorators: [
    (Story) => (
      <Box
        width="300px"
        borderStyle="solid"
        borderWidth="1"
        borderColor="neutral-interactive"
        padding="2"
      >
        <Story />
      </Box>
    ),
  ],
};

export const whiteSpaceNowrap: Story = {
  args: {
    children:
      "This text will not wrap to the next line even in a narrow container",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  decorators: [
    (Story) => (
      <Box
        width="200px"
        borderStyle="solid"
        borderWidth="1"
        borderColor="neutral-interactive"
        padding="2"
      >
        <Story />
      </Box>
    ),
  ],
};

export const whiteSpacePre: Story = {
  args: {
    children: `This text    has multiple
    spaces and line breaks
that will be preserved`,
    whiteSpace: "pre",
  },
};
