import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";

const meta: Meta<typeof Table> = {
  title: "Composite/Table",
  component: Table,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const basic: Story = {
  args: {
    children: (
      <>
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
      </>
    ),
  },
};

export const withCustomCellWidth: Story = {
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row backgroundColor="neutral-surface">
            <Table.Cell as="th" width="180px">
              This column has fixed width
            </Table.Cell>
            <Table.Cell as="th">This column has auto width</Table.Cell>
            <Table.Cell as="th" width="180px">
              This column has fixed width
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Array.from({ length: 10 }, (_, i) => (
            <Table.Row key={i}>
              <Table.Cell>Cell 1</Table.Cell>
              <Table.Cell>Cell 2</Table.Cell>
              <Table.Cell>Cell 3</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </>
    ),
  },
};

export const withNoPadding: Story = {
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row backgroundColor="neutral-surface">
            <Table.Cell as="th" padding="none">
              Header 1
            </Table.Cell>
            <Table.Cell as="th" padding="none">
              Header 2
            </Table.Cell>
            <Table.Cell as="th" padding="none">
              Header 3
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Array.from({ length: 10 }, (_, i) => (
            <Table.Row key={i}>
              <Table.Cell padding="none">Cell 1</Table.Cell>
              <Table.Cell padding="none">Cell 2</Table.Cell>
              <Table.Cell padding="none">Cell 3</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </>
    ),
  },
};
