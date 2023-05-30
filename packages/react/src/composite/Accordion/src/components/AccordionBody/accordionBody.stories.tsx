import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TiendanubeIcon } from "@nimbus-ds/icons";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Accordion } from "../../Accordion";

const meta: Meta<typeof Accordion.Body> = {
  title: "Composite/Accordion/Accordion.Body",
  component: Accordion.Body,
  render: (args) => (
    <Accordion>
      <Accordion.Item index="0">
        <Accordion.Header
          title="Title one"
          subtitle="Caption one"
          icon={<TiendanubeIcon size={18} />}
        />
        <Accordion.Body {...args} />
      </Accordion.Item>
    </Accordion>
  ),
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Accordion.Body>;

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
