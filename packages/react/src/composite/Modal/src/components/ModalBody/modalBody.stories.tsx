import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { Text } from "@nimbus-ds/text";
import { Button } from "@nimbus-ds/button";
import { Modal } from "../../Modal";

const meta: Meta<typeof Modal.Body> = {
  title: "Composite/Modal/Modal.Body",
  render: (args) => {
    const [{ open }, updateArgs] = useArgs();
    const handleClose = () => updateArgs({ open: !open });
    return (
      <>
        <Button onClick={handleClose}>Open</Button>
        <Modal open={open} onDismiss={handleClose}>
          <Modal.Header title="Title" />
          <Modal.Body {...args} />
          <Modal.Footer>
            <Button appearance="neutral">Button</Button>
            <Button appearance="primary">Button</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  component: Modal.Body,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal.Body>;

export const basic: Story = {
  args: {
    padding: "none",
    children: (
      <Text textAlign="left">
        Arcu condimentum enim at tristique aenean in. Fringilla urna, nec
        dignissim malesuada lobortis faucibus volutpat. Purus tincidunt
        adipiscing id felis, tincidunt nunc nibh urna ac.
      </Text>
    ),
  },
};
