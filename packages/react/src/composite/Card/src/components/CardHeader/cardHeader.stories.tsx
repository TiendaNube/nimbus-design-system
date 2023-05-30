import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Card } from "../../Card";

const meta: Meta<typeof Card.Header> = {
  title: "Composite/Card/Card.Header",
  component: Card.Header,
  render: (args) => (
    <Card>
      <Card.Header {...args} />
      <Card.Body>
        <Box
          borderStyle="dashed"
          padding="2"
          borderWidth="1"
          borderColor="neutral-interactive"
        >
          <Text textAlign="center">Replace me with your content</Text>
        </Box>
      </Card.Body>
    </Card>
  ),
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card.Header>;

export const basic: Story = {
  args: {
    title: "Title",
  },
};
