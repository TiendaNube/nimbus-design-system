import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
// eslint-disable-next-line
import { useArgs } from "@storybook/client-api";
import { modal } from "@nimbus-ds/styles";
import { Text } from "@nimbus-ds/text";
import { Button } from "@nimbus-ds/button";
import { Box } from "@nimbus-ds/box";
import { Title } from "@nimbus-ds/title";

import { Modal } from "./Modal";

export default {
  title: "Composite/Modal",
  component: Modal,
  subcomponents: {
    "Modal.Header": Modal.Header,
    "Modal.Body": Modal.Body,
    "Modal.Footer": Modal.Footer,
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  argTypes: {
    children: { control: { disable: true } },
    padding: { options: Object.keys(modal.properties.padding) },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [{ open }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ open: !open });
  return (
    <>
      <Button onClick={handleClose}>Open</Button>
      <Modal {...args} open={open} onDismiss={handleClose} />
    </>
  );
};

export const base = Template.bind({});
base.args = {
  children: (
    <>
      <Modal.Header title="Title" />
      <Modal.Body>
        <Text textAlign="left">
          Arcu condimentum enim at tristique aenean in. Fringilla urna, nec
          dignissim malesuada lobortis faucibus volutpat. Purus tincidunt
          adipiscing id felis, tincidunt nunc nibh urna ac.
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="neutral">Button</Button>
        <Button appearance="primary">Button</Button>
      </Modal.Footer>
    </>
  ),
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  children: (
    <>
      <Modal.Header title="Title" />
      <Modal.Body>
        <Box
          borderStyle="dashed"
          padding="2"
          borderWidth="1px"
          borderColor="neutral-interactive"
        >
          <Text textAlign="center">Replace me with your content</Text>
        </Box>
      </Modal.Body>
    </>
  ),
};

export const WithFooterAndHeader = Template.bind({});
WithFooterAndHeader.args = {
  children: (
    <>
      <Modal.Header title="Title" />
      <Modal.Body>
        <Box
          borderStyle="dashed"
          padding="2"
          borderWidth="1px"
          borderColor="neutral-interactive"
        >
          <Text textAlign="center">Replace me with your content</Text>
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary">Button</Button>
      </Modal.Footer>
    </>
  ),
};

export const content = Template.bind({});
content.args = {
  padding: "none",
  children: <Text textAlign="center">Replace me with your content</Text>,
};

export const skeleton = Template.bind({});
skeleton.args = {
  children: (
    <>
      <Modal.Header>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="4"
        >
          <Title.Skeleton as="h3" width="80%" />
        </Box>
      </Modal.Header>
      <Modal.Body>
        <Text.Skeleton width="100%" />
      </Modal.Body>
      <Modal.Footer>
        <Button.Skeleton />
        <Button.Skeleton />
      </Modal.Footer>
    </>
  ),
};
