import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Button } from "@nimbus-ds/button";
import { Sidebar } from "../../Sidebar";

const meta: Meta<typeof Sidebar.Footer> = {
  title: "Composite/Sidebar/Sidebar.Footer",
  render: (args) => {
    const [{ open }, updateArgs] = useArgs();
    const handleClose = () => updateArgs({ open: !open });
    return (
      <>
        <Button onClick={handleClose}>Open</Button>
        <Sidebar open={open} onRemove={handleClose} padding="base">
          <Sidebar.Header>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              borderStyle="dashed"
              padding="2"
              borderWidth="1"
              borderColor="neutral-interactive"
              boxSizing="border-box"
            >
              <Text textAlign="center">Header</Text>
            </Box>
          </Sidebar.Header>
          <Sidebar.Body>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              borderStyle="dashed"
              padding="2"
              borderWidth="1"
              borderColor="neutral-interactive"
              boxSizing="border-box"
            >
              <Text textAlign="center">Body</Text>
            </Box>
          </Sidebar.Body>
          <Sidebar.Footer {...args} />
        </Sidebar>
      </>
    );
  },
  component: Sidebar.Footer,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sidebar.Footer>;

export const basic: Story = {
  args: {
    children: (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        borderStyle="dashed"
        padding="2"
        borderWidth="1"
        borderColor="neutral-interactive"
        width="100%"
        boxSizing="border-box"
      >
        <Text textAlign="center">Footer</Text>
      </Box>
    ),
  },
};
