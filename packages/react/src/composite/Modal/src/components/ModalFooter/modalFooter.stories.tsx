import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Text } from "@nimbus-ds/text";
import { Button } from "@nimbus-ds/button";
import { Modal } from "../../Modal";

const meta: Meta<typeof Modal.Footer> = {
  title: "Composite/Modal/Modal.Footer",
  render: (args) => {
    const [{ open }, updateArgs] = useArgs();
    const handleClose = () => updateArgs({ open: !open });
    return (
      <>
        <Button onClick={handleClose}>Open</Button>
        <Modal open={open} onDismiss={handleClose}>
          <Modal.Header title="Title" />
          <Modal.Body padding="none">
            <Text textAlign="left">
              Arcu condimentum enim at tristique aenean in. Fringilla urna, nec
              dignissim malesuada lobortis faucibus volutpat. Purus tincidunt
              adipiscing id felis, tincidunt nunc nibh urna ac.
            </Text>
          </Modal.Body>
          <Modal.Footer {...args} />
        </Modal>
      </>
    );
  },
  component: Modal.Footer,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal.Footer>;

export const basic: Story = {
  args: {
    children: (
      <>
        <Button appearance="neutral">Button</Button>
        <Button appearance="primary">Button</Button>
      </>
    ),
  },
};
