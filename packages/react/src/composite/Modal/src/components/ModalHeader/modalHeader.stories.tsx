import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Text } from "@nimbus-ds/text";
import { Button } from "@nimbus-ds/button";
import { Modal } from "../../Modal";

const meta: Meta<typeof Modal.Header> = {
  title: "Composite/Modal/Modal.Header",
  render: (args) => {
    const [{ open }, updateArgs] = useArgs();
    const handleClose = () => updateArgs({ open: !open });
    return (
      <>
        <Button onClick={handleClose}>Open</Button>
        <Modal open={open} onDismiss={handleClose}>
          <Modal.Header {...args} />
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
        </Modal>
      </>
    );
  },
  component: Modal.Header,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal.Header>;

export const basic: Story = {
  args: {
    title: "Title",
  },
};
