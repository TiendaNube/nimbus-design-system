import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Table } from "./Table";

export default {
  title: "Composite/Table",
  component: Table,
  subcomponents: {
    "Table.Body": Table.Body,
    "Table.Cell": Table.Cell,
    "Table.Head": Table.Head,
    "Table.Row": Table.Row,
  },
  argTypes: {
    children: { control: { disable: true } },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const base = Template.bind({});
base.args = {
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
};

export const withCustomCellWidth = Template.bind({});
withCustomCellWidth.args = {
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
};

export const withNoPadding = Template.bind({});
withNoPadding.args = {
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
};
