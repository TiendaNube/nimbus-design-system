import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BoxPackedIcon } from "@nimbus-ds/icons";
import { Text } from "@nimbus-ds/text";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Atomic/Tag/Tag",
  component: Tag,
  argTypes: {
    children: { control: { type: "text" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const basic: Story = {
  args: {
    children: (
      <>
        <BoxPackedIcon size={12} />
        <Text fontSize="caption" lineHeight="caption">
          Text
        </Text>
      </>
    ),
  },
};

export const primary: Story = {
  args: {
    appearance: "primary",
    children: (
      <>
        <BoxPackedIcon size={12} />
        <Text fontSize="caption" lineHeight="caption" color="primary-textLow">
          Text
        </Text>
      </>
    ),
  },
};

export const success: Story = {
  args: {
    appearance: "success",
    children: (
      <>
        <BoxPackedIcon size={12} />
        <Text fontSize="caption" lineHeight="caption" color="success-textLow">
          Text
        </Text>
      </>
    ),
  },
};

export const neutral: Story = {
  args: {
    appearance: "neutral",
    children: (
      <>
        <BoxPackedIcon size={12} />
        <Text fontSize="caption" lineHeight="caption">
          Text
        </Text>
      </>
    ),
  },
};

export const warning: Story = {
  args: {
    appearance: "warning",
    children: (
      <>
        <BoxPackedIcon size={12} />
        <Text fontSize="caption" lineHeight="caption" color="warning-textLow">
          Text
        </Text>
      </>
    ),
  },
};

export const danger: Story = {
  args: {
    appearance: "danger",
    children: (
      <>
        <BoxPackedIcon size={12} />
        <Text fontSize="caption" lineHeight="caption" color="danger-textLow">
          Text
        </Text>
      </>
    ),
  },
};
