import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "../../Table";

const meta: Meta<typeof Table.Cell> = {
  title: "Composite/Table/Table.Cell",
  component: Table.Cell,
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row backgroundColor="neutral-surface">
          <Table.Cell as="th">Header 1</Table.Cell>
          <Table.Cell as="th">Header 2</Table.Cell>
          <Table.Cell as="th">Header 3</Table.Cell>
          <Table.Cell as="th">Header 4</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {Array.from({ length: 10 }, (_, i) => (
          <Table.Row key={i}>
            <Table.Cell>Cell 1</Table.Cell>
            <Table.Cell>Cell 2</Table.Cell>
            <Table.Cell>Cell 3</Table.Cell>
            <Table.Cell>Cell 4</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table.Cell>;

export const basic: Story = {
  args: {},
};
