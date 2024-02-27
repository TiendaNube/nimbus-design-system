import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Collapsible } from "../../Collapsible";

const meta: Meta<typeof Collapsible.Body> = {
  title: "Composite/Collapsible/Collapsible.Body",
  component: Collapsible.Body,
  render: (args) => (
    <Collapsible open>
      <Collapsible.Item>
        <Text>Collapsible</Text>
      </Collapsible.Item>
      <Collapsible.Body {...args} />
    </Collapsible>
  ),
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Collapsible.Body>;

export const basic: Story = {
  args: {
    children: (
      <Box
        width="100%"
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
