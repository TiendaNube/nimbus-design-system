import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Card } from "../../Card";

const meta: Meta<typeof Card.Body> = {
  title: "Composite/Card/Card.Body",
  component: Card.Body,
  render: (args) => (
    <Card>
      <Card.Header title="Title" />
      <Card.Body {...args} />
    </Card>
  ),
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card.Body>;

export const basic: Story = {
  args: {
    children: (
      <Box
        borderStyle="dashed"
        padding="2"
        borderWidth="1"
        borderColor="neutral-interactive"
      >
        <Text textAlign="center">Replace me with your content</Text>
      </Box>
    ),
  },
};
