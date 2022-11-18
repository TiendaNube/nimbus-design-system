import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
// eslint-disable-next-line
import { useArgs } from "@storybook/client-api";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Text } from "@nimbus-ds/text";
import { Stack } from "@nimbus-ds/stack";

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
      borderStyle="dashed"
      padding="2"
      borderWidth="1px"
      borderColor="neutral.interactive"
      height="100%"
    >
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Text textAlign="center" fontSize="base">
          Replace me with your content
        </Text>
      </Stack>
    </Box>
  ),
};

export const withPadding = Template.bind({});
withPadding.args = {
  padding: "base",
  children: (
    <Box
      borderStyle="dashed"
      padding="2"
      borderWidth="1px"
      borderColor="neutral.interactive"
      height="100%"
    >
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Text textAlign="center" fontSize="base">
          Replace me with your content
        </Text>
      </Stack>
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
          borderStyle="dashed"
          padding="2"
          borderWidth="1px"
          borderColor="neutral.interactive"
          height="100%"
        >
          <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Text textAlign="center" fontSize="base">
              Header
            </Text>
          </Stack>
        </Box>
      </Sidebar.Header>
      <Box
        borderStyle="dashed"
        padding="2"
        borderWidth="1px"
        borderColor="neutral.interactive"
        height="100%"
      >
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Text textAlign="center" fontSize="base">
            Body
          </Text>
        </Stack>
      </Box>
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
        borderStyle="dashed"
        padding="2"
        borderWidth="1px"
        borderColor="neutral.interactive"
        height="100%"
      >
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Text textAlign="center" fontSize="base">
            Replace me with your content
          </Text>
        </Stack>
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
          borderStyle="dashed"
          padding="2"
          borderWidth="1px"
          borderColor="neutral.interactive"
          height="100%"
        >
          <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Text textAlign="center" fontSize="base">
              Header
            </Text>
          </Stack>
        </Box>
      </Sidebar.Header>
      <Box
        borderStyle="dashed"
        padding="2"
        borderWidth="1px"
        borderColor="neutral.interactive"
        height="100%"
      >
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Text textAlign="center" fontSize="base">
            Body
          </Text>
        </Stack>
      </Box>
      <Sidebar.Footer>
        <Box
          borderStyle="dashed"
          padding="2"
          borderWidth="1px"
          borderColor="neutral.interactive"
          height="100%"
          width="100%"
        >
          <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Text textAlign="center" fontSize="base">
              Footer
            </Text>
          </Stack>
        </Box>
      </Sidebar.Footer>
    </>
  ),
};
