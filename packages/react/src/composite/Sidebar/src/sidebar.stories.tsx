import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
// eslint-disable-next-line
import { useArgs } from "@storybook/client-api";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Text } from "@nimbus-ds/text";

import { Sidebar } from "./Sidebar";

export default {
  title: "Composite/Sidebar",
  component: Sidebar,
  subcomponents: {
    "Sidebar.Header": Sidebar.Header,
    "Sidebar.Body": Sidebar.Body,
    "Sidebar.Footer": Sidebar.Footer,
  },
  argTypes: {
    children: { control: { disable: true } },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => {
  const [{ open }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ open: !open });
  return (
    <>
      <Button onClick={handleClose}>Open</Button>
      <Sidebar {...args} onRemove={handleClose} open={open} />
    </>
  );
};

export const base = Template.bind({});
base.args = {
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
};

export const withPadding = Template.bind({});
withPadding.args = {
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
};

export const withHeader = Template.bind({});
withHeader.args = {
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
};

export const withHeaderAndTitle = Template.bind({});
withHeaderAndTitle.args = {
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
};

export const withFooter = Template.bind({});
withFooter.args = {
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
};
