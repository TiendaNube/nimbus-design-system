import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Text } from "@nimbus-ds/text";
import { Button } from "@nimbus-ds/button";
import { Box } from "@nimbus-ds/box";
import { Title } from "@nimbus-ds/title";
import { Modal } from "./Modal";
import { ModalProps } from "./modal.types";

const meta: Meta<typeof Modal> = {
  title: "Composite/Modal",
  component: Modal,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const basic: Story = {
  render: (args) => {
    const [{ open }, updateArgs] = useArgs();
    const handleClose = () => updateArgs({ open: !open });
    return (
      <>
        <Button onClick={handleClose}>Open</Button>
        <Modal {...args} open={open} onDismiss={handleClose} />
      </>
    );
  },
  args: {
    children: (
      <>
        <Modal.Header title="Title" />
        <Modal.Body padding="none">
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
  },
};

const render = (args: ModalProps) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen((prevState) => !prevState);
  return (
    <>
      <Button onClick={handleClose}>Open</Button>
      <Modal {...args} open={open} onDismiss={handleClose} />
    </>
  );
};

export const WithHeader: Story = {
  render,
  args: {
    children: (
      <>
        <Modal.Header title="Title" />
        <Modal.Body>
          <Box
            borderStyle="dashed"
            padding="2"
            borderWidth="1"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Modal.Body>
      </>
    ),
  },
};

export const WithFooterAndHeader: Story = {
  render,
  args: {
    children: (
      <>
        <Modal.Header title="Title" />
        <Modal.Body>
          <Box
            borderStyle="dashed"
            padding="2"
            borderWidth="1"
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
  },
};

export const content: Story = {
  render,
  args: {
    padding: "none",
    children: <Text textAlign="center">Replace me with your content</Text>,
  },
};

export const skeleton: Story = {
  render,
  args: {
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
  },
};
