import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@nimbus-ds/text";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";

import { Popover } from "./Popover";

const meta: Meta<typeof Popover> = {
  title: "Atomic/Popover",
  component: Popover,
  render: (args) => (
    <Box display="flex" justifyContent="center">
      <Popover {...args} onVisibility={undefined}>
        <Text>Click-Hover</Text>
      </Popover>
    </Box>
  ),
  argTypes: {
    children: { control: { disable: true } },
    content: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const basic: Story = {
  args: {
    content: <Text color="primary-textLow">Replace me with your content</Text>,
  },
};

export const top: Story = {
  args: {
    content: <Text color="primary-textLow">Replace me with your content</Text>,
    position: "top",
    enabledHover: true,
    enabledDismiss: false,
  },
};

export const bottom: Story = {
  args: {
    content: <Text color="primary-textLow">Replace me with your content</Text>,
    position: "bottom",
    enabledHover: true,
    enabledDismiss: false,
  },
};

export const right: Story = {
  args: {
    content: <Text color="primary-textLow">Replace me with your content</Text>,
    position: "right",
    enabledHover: true,
    enabledDismiss: false,
  },
};

export const left: Story = {
  args: {
    content: <Text color="primary-textLow">Replace me with your content</Text>,
    position: "left",
    enabledHover: true,
    enabledDismiss: false,
  },
};

export const withOverlay: Story = {
  name: "With overlay",
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap="4">
        <Text fontSize="caption" color="neutral-textLow" textAlign="center">
          Clicking them will NOT trigger the row click event.
        </Text>
        <Popover {...args} visible={isOpen} onVisibility={setIsOpen}>
          <Button appearance="primary">Open Popover 1</Button>
        </Popover>
        <Text
          fontSize="caption"
          color="neutral-textLow"
          onClick={() => alert("Text clicked")}
        >
          This text is clickable when overlay is disabled (popover closed)
        </Text>
        <Popover {...args} visible={isOpen2} onVisibility={setIsOpen2}>
          <Button appearance="primary">Open Popover 2</Button>
        </Popover>
        <Text
          fontSize="caption"
          color="neutral-textLow"
          onClick={() => alert("Text clicked")}
        >
          This text is also clickable when overlay is disabled
        </Text>
      </Box>
    );
  },
  args: {
    content: <Text color="primary-textLow">Info popover 👻 </Text>,
    renderOverlay: true,
    enabledClick: true,
    enabledDismiss: true,
    width: "320px",
    position: "bottom-end",
  },
};

export const controlled: Story = {
  name: "Controlled",
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <Box display="flex" justifyContent="center" gap="4">
        <Popover {...args} visible={open} onVisibility={setOpen}>
          <Button appearance="primary">Toggle</Button>
        </Popover>
      </Box>
    );
  },
  args: {
    content: <Text color="primary-textLow">Controlled content</Text>,
    enabledClick: true,
    enabledDismiss: true,
  },
};

export const onlyOneOpenAtATime: Story = {
  name: "Only one open at a time (table pattern)",
  render: (args) => {
    const rows = Array.from({ length: 5 }).map((_, i) => ({
      id: `${i + 1}`,
      label: `Venta ${i + 1}`,
    }));

    const [openRowId, setOpenRowId] = useState<string | null>(null);

    return (
      <Box display="flex" flexDirection="column" gap="2">
        {rows.map((row) => {
          const isOpen = openRowId === row.id;
          return (
            <Box key={row.id} display="flex" alignItems="center" gap="2">
              <Text>{row.label}</Text>
              <Popover
                {...args}
                visible={isOpen}
                onVisibility={(next) => setOpenRowId(next ? row.id : null)}
                content={
                  <Box display="flex" flexDirection="column" gap="1">
                    <Button appearance="transparent">Facturar</Button>
                    <Button appearance="transparent">Ver recibo</Button>
                  </Box>
                }
              >
                <Button>Opciones</Button>
              </Popover>
            </Box>
          );
        })}
      </Box>
    );
  },
};
