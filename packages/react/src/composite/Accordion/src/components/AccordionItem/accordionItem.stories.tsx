import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TiendanubeIcon } from "@nimbus-ds/icons";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Accordion } from "../../Accordion";

const meta: Meta<typeof Accordion.Item> = {
  title: "Composite/Accordion/Accordion.Item",
  component: Accordion.Item,
  render: (args) => (
    <Accordion>
      <Accordion.Item {...args} />
    </Accordion>
  ),
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Accordion.Item>;

export const basic: Story = {
  args: {
    index: "0",
    children: (
      <>
        <Accordion.Header
          title="Title one"
          subtitle="Caption one"
          icon={<TiendanubeIcon size={18} />}
        />
        <Accordion.Body>
          <Box
            width="100%"
            borderStyle="dashed"
            padding="2"
            borderWidth="1"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Accordion.Body>
      </>
    ),
  },
};
