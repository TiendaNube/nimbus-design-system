import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Icon } from "@nimbus-ds/icon";
import { GenerativeStarsIcon, UserIcon } from "@nimbus-ds/icons";
import { Text } from "@nimbus-ds/text";

import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Atomic/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    children: { control: { disable: true } }
  }
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const basic: Story = {
  args: {
    children: "A"
  }
};

export const small: Story = {
  args: {
    size: "small",
    children: "A"
  }
};

export const large: Story = {
  args: {
    size: "large",
    children: "A"
  }
};

/** Welcome screen of an AI assistant chat. */
export const aiLarge: Story = {
  args: {
    size: "large",
    appearance: "ai",
    children: <Icon color="ai-generative" source={<GenerativeStarsIcon />} />
  }
};

export const withIcon: Story = {
  args: {
    children: <Icon color="currentColor" source={<UserIcon />} />
  }
};

export const ai: Story = {
  args: {
    appearance: "ai",
    children: <Icon color="ai-generative" source={<GenerativeStarsIcon />} />
  }
};

export const withAccessibleName: Story = {
  args: {
    "aria-label": "Avatar",
    children: "A"
  }
};

/** Store account button of the Admin global bar. */
export const insideButton: Story = {
  render: () => (
    <Button appearance="transparent">
      <Avatar size="small">A</Avatar>
      Avatar
    </Button>
  )
};

/** Header of an AI assistant answer in a chat. */
export const aiAssistantHeader: Story = {
  render: () => (
    <Box display="flex" alignItems="center" gap="2">
      <Avatar appearance="ai">
        <Icon color="ai-generative" source={<GenerativeStarsIcon />} />
      </Avatar>
      <Text fontWeight="bold">Lumi</Text>
    </Box>
  )
};
