import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Text } from "@nimbus-ds/text";
import { sidebar } from "@nimbus-ds/styles";
import { argTypesConvert } from ".storybook/utils";
import { Sidebar } from "./Sidebar";
import { SidebarProps } from "./sidebar.types";

const meta: Meta<typeof Sidebar> = {
  title: "Composite/Sidebar",
  component: Sidebar,
  argTypes: {
    children: { control: { disable: true } },
    ...argTypesConvert(sidebar.properties),
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const basic: Story = {
  render: (args) => {
    const [{ open }, updateArgs] = useArgs();
    const handleClose = () => updateArgs({ open: !open });
    return (
      <>
        <Button onClick={handleClose}>Open</Button>
        <Sidebar {...args} onRemove={handleClose} open={open} />
      </>
    );
  },
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
        boxSizing="border-box"
      >
        <Text textAlign="center">Replace me with your content</Text>
      </Box>
    ),
  },
};

const render = (args: SidebarProps) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen((prevState) => !prevState);
  return (
    <>
      <Button onClick={handleClose}>Open</Button>
      <Sidebar {...args} onRemove={handleClose} open={open} />
    </>
  );
};

export const withPadding: Story = {
  render,
  args: {
    padding: "base",
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
        boxSizing="border-box"
      >
        <Text textAlign="center">Replace me with your content</Text>
      </Box>
    ),
  },
};

export const withHeader: Story = {
  render,
  args: {
    padding: "base",
    children: (
      <>
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
      </>
    ),
  },
};

export const withHeaderAndTitle: Story = {
  render,
  args: {
    padding: "base",
    children: (
      <>
        <Sidebar.Header title="Title" />
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
          <Text textAlign="center">Replace me with your content</Text>
        </Box>
      </>
    ),
  },
};

export const withFooter: Story = {
  render,
  args: {
    padding: "base",
    children: (
      <>
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
        <Sidebar.Footer>
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
        </Sidebar.Footer>
      </>
    ),
  },
};
