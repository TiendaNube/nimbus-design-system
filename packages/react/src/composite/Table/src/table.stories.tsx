import React, { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import { Button } from "@nimbus-ds/button";
import { TableColumnLayout } from "./table.types";

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

type Column = {
  id: string;
  hidden: boolean;
  title: string;
} & TableColumnLayout;

export const withGrowColumns: Story = {
  args: {},
  render: () => {
    const columnLayout: Column[] = [
      {
        id: "1",
        minWidth: "100px",
        maxWidth: "100px",
        width: "100px",
        hidden: false,
        title: "Column 1",
      },
      { id: "2", grow: 2, hidden: false, title: "Column 2" },
      { id: "3", grow: 1, hidden: false, title: "Column 3" },
    ];
    const [columns, setColumns] = useState<Column[]>(columnLayout);

    const toggleColumnVisibility = (id: string) => {
      setColumns((prev) =>
        prev.map((column) =>
          column.id === id ? { ...column, hidden: !column.hidden } : column
        )
      );
    };

    return (
      <Table columnLayout={columns.filter((column) => !column.hidden)}>
        <Table.Head>
          <Table.Row backgroundColor="neutral-surface">
            {columns
              .filter((column) => !column.hidden)
              .map((column) => (
                <Table.Cell as="th" key={column.id}>
                  {column.title}
                  <Button onClick={() => toggleColumnVisibility(column.id)}>
                    Hide
                  </Button>
                </Table.Cell>
              ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Array.from({ length: 1 }, (_, i) => (
            <Table.Row key={i}>
              {columns.find((column) => column.id === "1")?.hidden ? null : (
                <Table.Cell>
                  Cell 1 Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Error tenetur vero odit culpa similique repellat minima
                  aperiam explicabo veniam velit, eius assumenda tempora fugit
                  suscipit reprehenderit ab libero sit ut. Ea sequi aut nobis
                  eos unde, illum numquam consectetur nisi maiores consequuntur
                  eveniet suscipit nesciunt veniam. Reprehenderit eligendi
                  quidem quibusdam, quae sapiente, expedita eos, velit
                  blanditiis doloribus dolorum voluptas quo!
                </Table.Cell>
              )}
              {columns.find((column) => column.id === "2")?.hidden ? null : (
                <Table.Cell>
                  Cell 2 Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Error tenetur vero odit culpa similique repellat minima
                  aperiam explicabo veniam velit, eius assumenda tempora fugit
                  suscipit reprehenderit ab libero sit ut. Ea sequi aut nobis
                  eos unde, illum numquam consectetur nisi maiores consequuntur
                  eveniet suscipit nesciunt veniam. Reprehenderit eligendi
                  quidem quibusdam, quae sapiente, expedita eos, velit
                  blanditiis doloribus dolorum voluptas quo!
                </Table.Cell>
              )}
              {columns.find((column) => column.id === "3")?.hidden ? null : (
                <Table.Cell>
                  Cell 3 Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Error tenetur vero odit culpa similique repellat minima
                  aperiam explicabo veniam velit, eius assumenda tempora fugit
                  suscipit reprehenderit ab libero sit ut. Ea sequi aut nobis
                  eos unde, illum numquam consectetur nisi maiores consequuntur
                  eveniet suscipit nesciunt veniam. Reprehenderit eligendi
                  quidem quibusdam, quae sapiente, expedita eos, velit
                  blanditiis doloribus dolorum voluptas quo!
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
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
